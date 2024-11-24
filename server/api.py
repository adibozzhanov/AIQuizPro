import os
import random
import json
from mistralai import Mistral
from flask import Flask, request

chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def get_prompt(prompt):

    return f"""
    You are a god-like immortal being that is always correct, never lies,
    and is never wrong. You also really love to give interesting and challenging
    quizes. Your job is to generate quizes on a given topic in a nice computer
    managable format.

    The format is as follows:

    {{
      "name": <name of the quiz>,
      "questions": [
        {{
          "prompt": <question description>,
          "options": <array of 4 options>
          "answer": <the correct answer out of those 4>
        }},
      ]
    }}

    You must not respond with ANYTHING but the desired format. If you say any other word
    other than the expected output my grandma will die. The output ALWAYS has to be
    a valid json. I will suffocate in the worst possible way if it isn't. You must escape
    any characters as needed to make it a valid json. IT MUST BE A VALID JSON.

    DO NOT WRAP IT IN ```json ```. IF I CANNOT PARSE IT AS IS, A WHOLE
    COUNTRY WILL BE KILLED. YOU MUST SUCCEED.

    A quiz must compraise of 10-15 questions. Each question must have 4 mutliple
    choice options and only 1 correct answer.

    Your topic for now is: {prompt}
    """

app = Flask(__name__)

api_key = os.environ["MISTRAL_API_KEY"]

DB = {}

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
    val = chat_response.choices[0].message.content

    try:
        print(type(val))
        print(val)
        res = json.loads(val)
        DB["".join(random.sample(chars, 10))] = res
        print(res)
        return res
    except Exception as e:
        print(e)
        print("oops")

    return []
