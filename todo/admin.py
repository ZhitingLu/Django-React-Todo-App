from django.contrib import admin

from todo.models import Todo


class TodoAdmin(admin.ModelAdmin):
    list = ('title', 'description', 'completed')

    admin.site.register(Todo)
