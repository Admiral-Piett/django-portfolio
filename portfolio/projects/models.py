from django.db import models

# Create your models here.
from django.db import models

class Work(models.Model):
    image = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=250)
    link = models.CharField(max_length=250, null=True, blank=True)
