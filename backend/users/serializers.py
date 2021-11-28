from rest_framework import serializers
from .models import Circulation



class CirculationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Circulation
        fields= ('id','username','title','author','barcode','status','issue_date','return_date')
