from django.db import models

# Create your models here.

class Classes(models.Model):
    subject = models.ForeignKey('subjects.Subject', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    duration = models.DurationField()       


    def __str__(self):
        return f"{self.subject} - {self.date}"
