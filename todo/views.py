from django.shortcuts import render
from .serializers import TodoSerializer
from rest_framework import viewsets
from todo.models import Todo


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

