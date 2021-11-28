from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BookSerializer
from .models import Book
# from rest_framework.response import Response
# from rest_framework.parsers import JSONParser
# from django.views.decorators.csrf import csrf_exempt
# from django.http import HttpResponse, JsonResponse
#
# # Create your views here.
#
#
# class BookView(viewsets.ModelViewSet):
#     serializer_class = BookSerializer
#     def get_queryset(self):
#
#         return Book.objects.all().order_by('title')
#
#     def list(self,request):
#         queryset = self.get_queryset()
#         serializer = BookSerializer(queryset,many=True)
#         return Response(serializer.data)
#
#
#
#     def create(self,request):
#         data = request.data
#         serializer = BookSerializer(data = data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=201)
#         return Response(serializer.errors ,status =400)
#
#
#
# @csrf_exempt
# def Bookview2(request):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         book = Book.objects.all()
#         serializer = BookSerializer(book, many=True)
#         return JsonResponse(serializer.data,safe=False)
#
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = BookSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)
#
#
#
# @csrf_exempt
# def Book_detail(request,pk):
#     try:
#         book = Book.objects.get(pk = pk)
#     except Exception as e:
#         return HttpResponse(status=300)
#     if request.method == "GET":
#         serializer = BookSerializer(book)
#         return Response(serializer.data)
#
#     elif request.method == "PUT":
#         data = JSONParser().parse(request)
#         serializer = BookSerializer(book,data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=400)
#         return Response(serializer.errors,status =400)
#
#     elif request.method =="DELETE":
#         book.delete()
#         return HttpResponse(status = 204)
#


class Catalogue(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all().order_by('title')
