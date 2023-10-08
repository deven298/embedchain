from django.db import models


class OpenAIKey(models.Model):
    key = models.CharField(max_length=255, unique=True)
