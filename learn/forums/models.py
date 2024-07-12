from django.db import models

class Post(models.Model):
    poster = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='posts')
    content = models.CharField(max_length=300)
    timestamp = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    commenter = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='comments')
    comment = models.CharField(max_length=300)
    timestamp = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name="comments")