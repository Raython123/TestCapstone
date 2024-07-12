from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from fuzzywuzzy import process
from django.contrib.auth.decorators import login_required
from .models import *

# Create your views here.

@login_required(login_url="/login",redirect_field_name='')
def index(request):
    belt = Belt.objects.get(belt=request.user.belt.title())
    moves = belt.moves.all()
    return render(request, "learn/index.html",{
        'moves':moves,
    })

def moves_view(request,belt):
    try:
        belt = Belt.objects.get(belt=belt.title())
        moves = belt.moves.all()
    except:
        return JsonResponse({'error':'An error occured'})
    return JsonResponse(serializers.serialize('json', moves), safe=False)

def fuzzySearch(request, move):
    names = [move.mov_name() for move in Move.objects.all()]
    result = process.extract(move, names, limit=5)
    result = [obj2dict(Move.objects.get(name=name[0])) for name in result if name[1] >= 90]
    return JsonResponse({'result':result})

def obj2dict(obj):
    return {
        'name': obj.name,
        'belt': obj.belt.name(),
        'video': obj.video
    }