from rest_framework import serializers
from .models import Meeting

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ['id', 'room_name', 'host_name', 'host_room_url', 
                 'viewer_room_url', 'created_at', 'status']
        read_only_fields = ['id', 'created_at', 'host_room_url', 'viewer_room_url']

class MeetingCreateSerializer(serializers.Serializer):
    room_name = serializers.CharField(max_length=255)
    host_name = serializers.CharField(max_length=255, required=False, default='Anonymous')
    end_date = serializers.DateTimeField(required=False)  
