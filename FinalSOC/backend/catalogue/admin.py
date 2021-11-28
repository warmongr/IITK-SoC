from django.contrib import admin
from .models import Book


class BooksAdmin(admin.ModelAdmin):
    list_display = ('title','author','barcode','status','return_date')



admin.site.register(Book,BooksAdmin)
