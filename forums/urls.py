from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='forums'),
    path('posts/<int:postid>', views.room, name="room")
]