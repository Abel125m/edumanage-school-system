from django.db import models

# Create your models here.

class Attendance(models.Model):
    subject = models.ForeignKey('subjects.Subject', on_delete=models.CASCADE)
    date=models.DateField()
    time=models.TimeField()
    duration=models.DurationField()
    total_marks=models.IntegerField()
   

    def __str__(self):
        return f"{self.subject} {self.time}"