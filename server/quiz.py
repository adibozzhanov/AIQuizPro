from dataclasses import dataclass


@dataclass
class Quiz:
    quizId: str
    name: str
    answer: str


@dataclass
class Question:
    questionId: str
    prompt: str
    options: list[str]
    answer: str
