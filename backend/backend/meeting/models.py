from django.db import models

class Meeting(models.Model):
    room_name = models.CharField(max_length=255)
    host_name = models.CharField(max_length=255, blank=True, default='Anonymous')
    host_room_url = models.URLField(max_length=2047)
    viewer_room_url = models.URLField(max_length=2047)
    created_at = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True)  # New field for end date

    status = models.CharField(max_length=20, default='active')

    def __str__(self):
        return f"{self.room_name} by {self.host_name}"