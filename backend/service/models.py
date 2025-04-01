from django.db import models
import random
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from django.core.exceptions import ValidationError
from email.mime.text import MIMEText
from server.models import Server
from django.utils import timezone
from dotenv import load_dotenv


load_dotenv()  # Load environment variables

class Service(models.Model):
    
    server = models.ForeignKey(Server, on_delete=models.CASCADE, null=False, blank=False, default=1)
    cometa_selenoid = models.BooleanField(default=False)
    cometa_front = models.BooleanField(default=False)
    cometa_novnc = models.BooleanField(default=False)
    cometa_scheduler = models.BooleanField(default=False)
    cometa_socket = models.BooleanField(default=False)
    cometa_postgres = models.BooleanField(default=False)
    cometa_behave = models.BooleanField(default=False)
    cometa_django = models.BooleanField(default=False)
    cometa_redis = models.BooleanField(default=False)
    created_on = models.DateTimeField(default=timezone.now)
    
    upCount = models.IntegerField(default=0)
    downCount = models.IntegerField(default=0)
    error = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"Service ID: {self.id} - Server ID: {self.server.id if self.server else 'No Server'}"
    
    
    def send_error_email(self, error_field):
        """Send an email when there are False fields in the service model."""
        sender_email = os.getenv("EMAIL_USER")
        password = os.getenv("EMAIL_PASS")
        
        # Ensure server exists and has emails
        if not self.server or not self.server.emails:
            print("❌ No email data found in the server model. Email not sent.")
            return
        
        email_list = self.server.emails  # Use directly if stored as a JSONField
        
        # Dynamically distribute emails into To, CC, and BCC
        receiver_emails = [email["email"] for email in email_list[:1]]  # First email as receiver
        cc_emails = [email["email"] for email in email_list[1:2]]  # Second email as CC
        bcc_emails = [email["email"] for email in email_list[2:]]  # Remaining emails as BCC
        
        if not receiver_emails:
            print("❌ No valid recipient email found.")
            return
        
        print(f"Sending email to: {receiver_emails}, CC: {cc_emails}, BCC: {bcc_emails}")
        
        # Format the failed fields into the email body
        error_text = "\n".join(
            [f" <b>{field.replace('_', ' ').title()}</b>: {message}" for field, message in error_field.items()]
        )

        
        

        
        # Email body with detailed error information
        error_body = f"<html><body><h2>🚨 Service Error Alert 🚨</h2><p><b>🖥 Server ID:</b> {self.server.id if self.server else 'Unknown'}</p><p>The following services are experiencing issues:</p><ul>{''.join(f'<li>{msg}</li>' for msg in error_text.splitlines())}</ul><p>Please investigate and resolve the issue as soon as possible.</p><p>Thank you.</p></body></html>"
       

        # Prepare email content
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = ", ".join(receiver_emails)
        msg['Cc'] = ", ".join(cc_emails)  # CC recipients in the email header
        msg['Subject'] = "🚨 Service Error Notification"

        

        msg.attach(MIMEText(error_body, 'html'))
        
        # Combine all recipients for sending (To, CC, and BCC)
        all_recipients = receiver_emails + cc_emails + bcc_emails
        
        # Send email
        try:
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, all_recipients, msg.as_string())
            server.quit()
            print(f"✅ Alert email sent to {receiver_emails}, CC: {cc_emails}, BCC: {bcc_emails}!")
        except Exception as e:
            print(f"❌ Email error: {e}")

    
    def save(self, *args, **kwargs):
        """Custom save method to trigger email on False fields."""
        boolean_fields = [
            'cometa_selenoid', 'cometa_front', 'cometa_novnc', 
            'cometa_scheduler', 'cometa_socket', 'cometa_postgres', 
            'cometa_behave', 'cometa_django', 'cometa_redis'
        ]

        error_messages = {
            "cometa_selenoid": "Selenium Grid service is not responding.",
            "cometa_front": "Frontend service is down.",
            "cometa_novnc": "NoVNC remote connection failed.",
            "cometa_scheduler": "Task scheduler encountered a failure.",
            "cometa_socket": "WebSocket connection issue detected.",
            "cometa_postgres": "Database is unavailable.",
            "cometa_behave": "Test automation is not functioning properly.",
            "cometa_django": "Backend service is not running.",
            "cometa_redis": "Redis cache service is down.",
        }
        
        # Collect all false fields and their corresponding errors
        false_field_errors = {field: error_messages[field] for field in boolean_fields if not getattr(self, field)}

        
        if false_field_errors:
            # Send email with all false fields and their reasons
            self.send_error_email(false_field_errors)

            # Store errors in the model instead of blocking save
            self.error = false_field_errors
           
           # Prevent saving to the database
            #raise ValidationError(f"❌ Error: Some services are down. Data not saved.")


        # Count True and False fields
        self.upCount = sum(getattr(self, field) for field in boolean_fields)
        self.downCount = len(false_field_errors)
        
        
        super(Service, self).save(*args, **kwargs)
