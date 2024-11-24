import os
import json
from mistralai import Mistral
from flask import Flask, request



def get_prompt(prompt):

    return f"""PROMPT
    You are a system that makes quizzes. Your job is to generate quizes on
    a given topic, in a very precise format.

    The format is as follows:

    [
    {{
      "prompt": <question description>,
      "options": <array of 4 options>
      "answer": <the correct answer out of those 4>
    }},
    ]

    You must not respond with ANYTHING but the desired format. If you say any other word
    other than the expected output my grandma will die. The output ALWAYS has to be
    a valid json. I will suffocate in the worst possible way if it isn't.

    A quiz must compraise of 10-15 questions. Each question must have 4 mutliple
    choice options and only 1 correct answer.

    Your topic for now is: {prompt}
    """

app = Flask(__name__)

api_key = os.environ["MISTRAL_API_KEY"]

@app.route("/prompt")
def hello_world():
    prompt = request.args.get("prompt")
    model = "mistral-large-latest"

    client = Mistral(api_key=api_key)

    chat_response = client.chat.complete(
        model = model,
        messages = [
            {
                "role": "user",
                "content": get_prompt(prompt),
            },
        ]
    )
    print(chat_response.choices[0].message.content)



    return "<p>Hello, World!</p>"
