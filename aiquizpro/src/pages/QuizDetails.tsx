import { queryOptions, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { sleep } from "./Landing";
import { Center, Skeleton, Stack, Title } from "@mantine/core";
import QRCode from "react-qr-code";

export interface IQuestion {
  qid: string;
  prompt: string;
  options: [string, string, string, string];
  answer: string;
  verified: boolean;
}

interface IMetric { }

export interface IQuiz {
  id: string;
  name: string;
  questions: IQuestion[];
}

const _test_quiz = {
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

function QuizDetails() {
  const { quizId } = useParams();
  const { data } = useQuery({
    queryKey: ["getQuiz"],
    queryFn: async () => {
      await sleep(1000);
      return _test_quiz;
    },
  });

  const url = `${window.location.origin}/quiz/${quizId}`;
  return (
    <Center h="100%">
      <Stack align="center" gap="2rem">
        <Title order={1}>{data?.name}</Title>
        <QRCode value={url} />
        <Title order={3}>Scan QR code to start the quiz</Title>
        <Title order={3}>{url}</Title>
      </Stack>
    </Center>
  );
}

export default QuizDetails;
