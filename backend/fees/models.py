from django.db import models

# Create your models here.

class fees(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)



    def __str__(self):
        return f"{self.first_name}"