from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=50,unique=True)
    author = models.CharField(max_length=50)
    barcode = models.CharField(max_length=20,unique=True)
    status = models.BooleanField(default=True)
    issued_to = models.CharField(max_length=20,blank=True)
    issue_date = models.DateField(default='2019-01-01',blank=True)
    return_date =models.DateField(default='2019-01-01',blank=True)
    def _str_(self):
        return self.title
