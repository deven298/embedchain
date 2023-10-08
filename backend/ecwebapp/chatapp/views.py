from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import OpenAIKey
from .serializers import OpenAIKeySerializer
from embedchain import App
import os

os.environ["OPENAI_API_KEY"] = ""
bot = App()


@api_view(["POST"])
def save_openai_key(request):
    print("Saving open ai key", request)
    key = request.data.get("key", "")

    if OpenAIKey.objects.exists():
        OpenAIKey.objects.delete()
        openai_key = OpenAIKey(key=key)
        openai_key.save()
        os.environ["OPENAI_API_KEY"] = key
        return Response(
            {"success": "OpenAI key has been updated."}, status=status.HTTP_200_OK
        )

    openai_key = OpenAIKey(key=key)
    openai_key.save()

    return Response(
        {"success": "OpenAI key has been saved."}, status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
def send_openai_key(request):
    if OpenAIKey.objects.exists():
        key = OpenAIKey.objects.first()
        serializer = OpenAIKeySerializer(key)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "No OpenAI key found."}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
def add_data(request):
    data = request.data.get("data", None)
    if not data:
        return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
    print("Add data to bot", data)
    # type = data.get('type', None)
    url = data.get("value", None)
    if url:
        bot.add(url)
        return Response(
            {"success": "Added data successfully"}, status=status.HTTP_200_OK
        )
    else:
        return Response({"error": "Invalid url"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def ask_question(request):
    question = request.data.get("question", None)
    # print("Ask question to bot", question)
    response = bot.query(question)
    # print("Bot responded", response)
    return Response({"response": response}, status=status.HTTP_200_OK)
