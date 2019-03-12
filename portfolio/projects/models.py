from django.db import models

# Create your models here.
from django.db import models

class Projects(models.Model):
    title = models.CharField(max_length=50, null=True)
    image = models.ImageField(upload_to='images/')
    description = models.TextField(max_length=1000)
    link = models.CharField(max_length=250, null=True, blank=True)
    created_at = models.DateTimeField()
