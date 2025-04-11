# meetings/views.py
import datetime
import requests
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Meeting
from .serializers import MeetingSerializer, MeetingCreateSerializer


class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.filter(status='active')
    serializer_class = MeetingSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return MeetingCreateSerializer
        return MeetingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extract data from validated serializer
        room_name = serializer.validated_data['room_name']
        host_name = serializer.validated_data.get('host_name', 'Anonymous')
        end_date = serializer.validated_data.get('end_date')  # This could be None
        
        # Call Whereby API to create a meeting
        whereby_response = self.create_whereby_meeting(room_name, end_date)
        
        if whereby_response.status_code != 201:
            return Response(
                {"error": "Failed to create meeting with Whereby API", 
                "details": whereby_response.json()},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        whereby_data = whereby_response.json()
        
        # Create the meeting in our database
        meeting = Meeting.objects.create(
            room_name=room_name,
            host_name=host_name,
            host_room_url=whereby_data['hostRoomUrl'],
            viewer_room_url=whereby_data['viewerRoomUrl'],
        )
        
        return Response(
            MeetingSerializer(meeting).data,
            status=status.HTTP_201_CREATED
        )
    
    def create_whereby_meeting(self, room_name, end_date=None):
        """
        Call the Whereby API to create a meeting.
        
        Args:
            room_name: Name of the room
            end_date: Optional end date for the meeting. If not provided, defaults to 24 hours from now.
        """
        url = "https://api.whereby.dev/v1/meetings"
        headers = {
            "Authorization": f"Bearer {settings.WHEREBY_API}",
            "Content-Type": "application/json"
        }
        
        # If no end date is provided, set it to 24 hours from now
        if not end_date:
            end_date = datetime.datetime.now() + datetime.timedelta(hours=24)
        
        # Ensure end_date is in ISO format string
        if isinstance(end_date, datetime.datetime):
            end_date = end_date.isoformat()
        print("room_name",room_name)
        data = {
            "roomNamePrefix": room_name,
            "endDate": end_date,  # Required field for Whereby API
            "fields": ["hostRoomUrl", "viewerRoomUrl"]
        }
        
        return requests.post(url, json=data, headers=headers)

    @action(detail=True, methods=['put'])
    def end_meeting(self, request, pk=None):
        meeting = self.get_object()
        meeting.status = 'ended'
        meeting.save()
        return Response(MeetingSerializer(meeting).data)