from django.urls import path
from .views import save_openai_key, send_openai_key, add_data, ask_question

urlpatterns = [
    path("authenticateKey/", save_openai_key, name="save_openai_key"),
    path("key/", send_openai_key, name="send_openai_key"),
    path("addData/", add_data, name="add_data"),
    path("ask/", ask_question, name="ask_question"),
]
