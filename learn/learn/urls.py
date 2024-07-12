from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='learn'),
    path('<str:belt>', views.moves_view, name='moves'),
    path('search/<str:move>', views.fuzzySearch, name="search")
]