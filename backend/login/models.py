from django.db import models
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password

class CustomUser(models.Model):
    user_name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, primary_key=True)
    email_password = models.CharField(max_length=255)
    user_password = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=now)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Hash the password before saving only if it's not already hashed
        if not self.user_password.startswith('pbkdf2_'):
            self.user_password = make_password(self.user_password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    
    
    
    
    
