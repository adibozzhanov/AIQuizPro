from dataclasses import dataclass


@dataclass
class Quiz:
    source: str
    question: str
    options: list[str]
    answer: str
