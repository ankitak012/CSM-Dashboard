
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from collections import OrderedDict

class Server(models.Model):
    server_name = models.CharField(max_length=255)
    server_secret_name = models.CharField(max_length=255)
    server_secret_password = models.CharField(max_length=255)
    created_on = models.DateTimeField(default=timezone.now)
    emails = models.JSONField(default=list)  # Stores list of email objects

    def save(self, *args, **kwargs):
        duplicate_emails = []
        # Clean and deduplicate emails
        if isinstance(self.emails, list) and all(isinstance(e, str) for e in self.emails):
            cleaned_emails = [email.strip() for email in self.emails if email.strip()]
            duplicate_emails = [email for email in cleaned_emails if cleaned_emails.count(email) > 1]

            
            if duplicate_emails:
                raise ValidationError({
                    'emails': [f"Duplicate email(s) found for this server: {', '.join(set(duplicate_emails))}"]
                })
            
            unique_emails = list(OrderedDict.fromkeys(cleaned_emails)) 
            
            self.emails = [
                {"id": idx + 1, "email": email}
                for idx, email in enumerate(unique_emails)
            ]


        elif isinstance(self.emails, list) and all(isinstance(e, dict) and 'email' in e for e in self.emails):
            # Already in desired format, skip transformation
            pass
            
        super().save(*args, **kwargs)


    def email_count(self):
        return len(self.emails)

    def __str__(self):
        return  f"{self.server_name} ({self.id})"
