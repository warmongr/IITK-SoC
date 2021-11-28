from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CirculationHistorySerializer
from .models import Circulation
from rest_framework.response import Response

# Create your views here.

class Circulation(viewsets.ModelViewSet):
    serializer_class = CirculationHistorySerializer
    queryset = Circulation.objects.all()
