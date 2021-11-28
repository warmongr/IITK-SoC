from django.contrib import admin
from .models import Circulation
# Register your models here.
class CirculationAdmin(admin.ModelAdmin):
    list_display =('username','title','author','barcode','issue_date','status','return_date')

admin.site.register(Circulation,CirculationAdmin)
