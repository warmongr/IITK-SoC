from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id','title','author','barcode','status','issued_to','issue_date','return_date')
