from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from rest_framework import serializers, viewsets
from django.utils.timezone import now

class UserManager(BaseUserManager):
    def create_user(self, user_name, email, email_password, user_password=None):
        if not email:
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email)
        user = self.model(user_name=user_name, email=email, email_password=email_password)
        
        if user_password:
            user.set_password(user_password)  # Hash user_password
        user.save(using=self._db)
        return user

    def create_superuser(self, user_name, email, email_password, user_password):
        user = self.create_user(user_name, email, email_password, user_password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    user_name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True,primary_key=True)
    email_password = models.CharField(max_length=255)
    user_password = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=now)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'email_password']

    def __str__(self):
        return self.user_name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
