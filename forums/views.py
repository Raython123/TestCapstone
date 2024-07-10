from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.core.paginator import Paginator
from django import forms

import json
from .models import *
from user.models import User
# Tha views here
class NewContent(forms.Form):
    content = forms.CharField(label='',max_length=300, widget=forms.Textarea)

# Create your views here.
def index(request):
    if request.method == "POST":
        form = NewContent(request.POST)
        if form.is_valid():
            user = User.objects.get(username=request.user.username)
            newPost = Post(poster=user, content=form.cleaned_data["content"])
            newPost.save()
            return redirect(reverse('forums'))
    posts = Post.objects.all().order_by('-timestamp')
    paginator = Paginator(posts, 10)
    page_num = request.GET.get('page')
    page = paginator.get_page(page_num)
    return render(request, "forums/index.html",{
        'newPost':NewContent(),
        'posts': page,
    })

def room(request, postid):
    try:
        user = User.objects.get(username=request.user.username)
        post = Post.objects.get(id=postid)
        comments = post.comments.all().order_by('-timestamp')
        if request.method == "POST":
            data = json.loads(request.body)
            if data.get("content") is not None:
                newComment = Comment(commenter=user,comment=data['content'],post=post)
                newComment.save()
                # Newt line to avoid dealing with serialzers
                return JsonResponse({'comment': {'commenter': newComment.commenter.username, 'content': newComment.comment, 'timestamp':newComment.timestamp}})
                
        return render(request, "forums/post.html",{
            'post': post,
            'comments':comments
        })
    except Exception as e:
        print(e)
        return redirect(reverse('forums'))