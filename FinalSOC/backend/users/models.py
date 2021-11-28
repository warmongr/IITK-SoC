from django.db import models

# Create your models here.

class Circulation(models.Model):
    username =models.CharField(max_length=20)
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    barcode = models.CharField(max_length=20)
    issue_date = models.DateField(auto_now_add=True,null=True)
    status = models.BooleanField()
    return_date = models.DateField(null=True,blank=True)
    def _str_(self):
        return self.username
