from django.db import models

# Create your models here.

class Contact(models.Model):
    first_name = models.CharField(max_length=255, blank=False, null=False)
    surname = models.CharField(max_length=255, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    phone = models.CharField(max_length=15, blank=False, null=False)
    mobile = models.CharField(max_length=15, blank=True, null=True)  
    
    def __str__(self):
        return self.first_name
