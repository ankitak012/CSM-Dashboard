
from django.db import models
from django.utils import timezone

class Server(models.Model):
    server_name = models.CharField(max_length=255)
    server_secret_name = models.CharField(max_length=255)
    server_secret_password = models.CharField(max_length=255)
    created_on = models.DateTimeField(default=timezone.now)
    emails = models.JSONField(default=list)  # Stores list of email objects

    def save(self, *args, **kwargs):
        # Ensure unique email IDs and update email count
        unique_emails = {email["id"]: email for email in self.emails}.values()
        self.emails = list(unique_emails)  # Remove duplicates based on "id"
        super().save(*args, **kwargs)

    def email_count(self):
        return len(self.emails)

    def __str__(self):
        return  f"{self.server_name} ({self.id})"
