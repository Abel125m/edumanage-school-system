from django.db import models

# Create your models here.

class Results(models.Model):
    subject = models.ForeignKey('subjects.Subject', on_delete=models.CASCADE)
    _date=models.DateField()
    time=models.TimeField()
    total_marks=models.IntegerField()   
  

    def __str__(self):
        return f"{self.subject} - {self._date}"