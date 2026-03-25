from django.db import models

# Create your models here.

class exams(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.date}"