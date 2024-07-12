from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django import forms
from .models import *
import json
# Forms

# Create your views here.

def index(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("username") is not None:
            notvalid_username = User.objects.filter(username=data['username']).exists()
            if notvalid_username:
                return JsonResponse({'error':f'{data['username']} already exists'})
            else:
                user = User.objects.get(username=request.user.username)
                user.username = data['username']
                user.belt = data["belt"]
                user.save()
                return JsonResponse({'success':'Success'})
    if request.user.is_authenticated:
        return render(request, "user/index.html")
    else:
        return HttpResponseRedirect(reverse("login"))

def login(request):
    if request.method == "POST":
        data = request.POST
        username = data["username"]
        pwd = data["password"]
        user = authenticate(request, username=username, password=pwd)
        if user is not None:
            auth_login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "user/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "user/login.html")
        

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        data = request.POST
        username = data["username"]
        email = data["email"]
        belt = data["belts"]
        # Ensure password matches confirmation
        password = data["password"]
        confirmation = data["confirmation"]
        if password != confirmation:
            return render(request, "user/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.belt = belt
            user.save()
        except IntegrityError:
            return render(request, "user/register.html", {
                "message": "Username already taken."
            })
        auth_login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "user/register.html")

