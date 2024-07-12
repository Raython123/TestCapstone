from django.db import models

# Create your models here.
class Move(models.Model):
    name = models.CharField(max_length=100)
    video = models.URLField()
    belt = models.ForeignKey('Belt', related_name='moves', on_delete=models.CASCADE)
    forbidden = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.name} for {self.belt}'
    def get_embed_url(self):
        return self.video.replace("youtu.be/", "youtube.com/embed/")
    def mov_name(self):
        return self.name

class Belt(models.Model):
    belt = models.CharField(max_length=6)
    
    def __str__(self):
        return self.belt
    def name(self):
        return self.belt