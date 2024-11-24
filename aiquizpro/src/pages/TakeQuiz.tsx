import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { sleep } from "./Landing";
import { Button, Flex, SegmentedControl, Stack, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import TakeQuizCard from "../components/TakeQuizCard";
import { IQuiz } from "./QuizDetails";

const _test_quiz: IQuiz = {
  id: "qiqiqi",
  name: "Quizzio",
  questions: [
    {
      qid: "1",
      prompt: "What's python?",
      options: ["Language", "Snake", "A drink", "Pokemon"],
      answer: "Language",
      verified: true,
    },
    {
      qid: "2",
      prompt: "Who is Adi?",
      options: ["A human", "A kazakh", "Nobody", "A moron"],
      answer: "A moron",
      verified: false,
    },
    {
      qid: "3",
      prompt:
        "Actually long question with actually long data and stuff and maybe you can be longer? ",
      options: ["A human", "A kazakh", "Nobody", "A moron"],
      answer: "A moron",
      verified: false,
    },
  ],
};

function TakeQuiz() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { isPending, data } = useQuery({
    queryKey: ["getQuiz"],
    queryFn: async () => {
      await sleep(1000);
      return _test_quiz;
    },
  });

  const [selectedIndex, setSelectedIndex] = useState("0");

  const segmentedQuestions = useMemo(
    () =>
      data?.questions.map((_, ind) => ({
        label: `${ind + 1}`,
        value: `${ind}`,
      })) || [],

    [data],
  );

  const [answers, setAnswers] = useState<(string | undefined)[]>(
    segmentedQuestions?.map(() => undefined) || [],
  );

  const allQuestionsAnswered = useMemo(
    () => !answers.some((v) => !v),
    [answers],
  );

  return (
    <Stack h="100%">
      <Title order={1}>{data?.name}</Title>
      <Flex direction="row" h="100%" align="center" gap="0.5rem">
        <Stack>
          <SegmentedControl
            orientation="vertical"
            value={selectedIndex}
            onChange={setSelectedIndex}
            data={segmentedQuestions}
          />
        </Stack>
        <Stack w="100%" align="center">
          {data?.questions.map((q, i) => (
            <TakeQuizCard
              question={q}
              mounted={`${i}` === selectedIndex}
              selected={answers[i]}
              onSelected={(ans) => {
                const tmp = [...answers];
                tmp[i] = ans;
                setAnswers(tmp);

                if (i !== segmentedQuestions.length - 1) {
                  setTimeout(
                    () =>
                      setSelectedIndex(
                        `${(i + 1) % segmentedQuestions.length}`,
                      ),
                    500,
                  );
                }
              }}
            />
          ))}
          {allQuestionsAnswered && (
            <Button onClick={() => navigate("/")}>Finish</Button>
          )}
        </Stack>
      </Flex>
    </Stack>
  );
}

export default TakeQuiz;
