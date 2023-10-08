from rest_framework import serializers
from .models import OpenAIKey


class OpenAIKeySerializer(serializers.ModelSerializer):
    class Meta:
        app_label = "chatapp"
        model = OpenAIKey
        fields = ["key"]
