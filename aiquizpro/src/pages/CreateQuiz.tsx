import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Flex,
  HoverCard,
  Portal,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import EditQuizCard from "../components/EditQuizCard";
import { useEffect, useRef, useState } from "react";
import { IconArrowLeft, IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import EditQuizDrawer from "../components/EditQuizDrawer";
import { sleep } from "./Landing";
import { useMutation } from "@tanstack/react-query";

const _cards: {
  qid: string;
  prompt: string;
  options: [string, string, string, string];
  answer: string;
  verified: boolean;
}[] = [
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
    {
      qid: "4",
      prompt: "Who is Adi?",
      options: ["A human", "A kazakh", "Nobody", "A moron"],
      answer: "A moron",
      verified: false,
    },
    {
      qid: "5",
      prompt: "Who is Adi?",
      options: ["A human", "A kazakh", "Nobody", "A moron"],
      answer: "A moron",
      verified: false,
    },
    {
      qid: "6",
      prompt: "Who is Adi?",
      options: ["A human", "A kazakh", "Nobody", "A moron"],
      answer: "A moron",
      verified: false,
    },
  ];

function CreateQuiz() {
  const [cards, setCards] = useState(_cards);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [ignoreIds, setIgnoreIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      return sleep(1000).then(() => "qerweqre");
    },
    onError: () => navigate(`/`),
    onSuccess: (qid) => navigate(`/quizDetails/${qid}`),
  });

  const onCreate = (
    p: string,
    o: [string, string, string, string],
    a: string,
  ) => {
    setCards([
      {
        prompt: p,
        options: o,
        answer: a,
        verified: false,
        qid: "none",
      },
      ...cards,
    ]);
  };

  const checkedEverything =
    cards.length === ignoreIds.length + checkedIds.length;

  useEffect(() => {
    setMounted(true);
  });

  return (
    <Flex gap="1rem" justify="flex-start">
      <Stack w={checkedEverything ? "100%" : undefined}>
        <Stack>
          <ActionIcon variant="light" color="blue" onClick={() => { }}>
            <IconArrowLeft onClick={() => navigate("/")} />
          </ActionIcon>
          <ActionIcon
            color="blue"
            onClick={() => {
              open();
            }}
          >
            <IconPlus />
          </ActionIcon>
        </Stack>
        <Stack w="100%" justify="center" align="center">
          <Stack>
            {cards
              .filter(
                (c) => checkedIds.includes(c.qid) || ignoreIds.includes(c.qid),
              )
              .map((c) => {
                const checked = checkedIds.includes(c.qid);
                return (
                  <Flex gap="0.5rem">
                    <HoverCard disabled={checkedEverything} position="right">
                      <HoverCard.Target>
                        <ActionIcon
                          color={checked ? "green" : "red"}
                          key={c.qid}
                          onClick={() => {
                            if (checked) {
                              setCheckedIds(
                                checkedIds.filter((cc) => cc !== c.qid),
                              );
                            } else {
                              setIgnoreIds(
                                ignoreIds.filter((cc) => cc !== c.qid),
                              );
                            }
                          }}
                        >
                          {checked ? <IconCheck /> : <IconX />}
                        </ActionIcon>
                      </HoverCard.Target>
                      <HoverCard.Dropdown>
                        <Text>{c.prompt}</Text>
                      </HoverCard.Dropdown>
                    </HoverCard>

                    <Transition
                      mounted={checkedEverything}
                      transition="slide-right"
                    >
                      {(styles) => <Text style={styles}>{c.prompt}</Text>}
                    </Transition>
                  </Flex>
                );
              })}
            <Transition mounted={checkedEverything} transition="slide-right">
              {(styles) => (
                <Button
                  onClick={() => mutate()}
                  loading={isPending}
                  mx="auto"
                  style={styles}
                >
                  Confirm
                </Button>
              )}
            </Transition>
          </Stack>
        </Stack>
      </Stack>
      {!checkedEverything && (
        <>
          <Divider orientation="vertical" />
          <Center w="100%">
            <Stack justify="center">
              {cards.map((c) => (
                <EditQuizCard
                  key={c.qid}
                  onEdit={(p, o, a) => {
                    const ind = cards.findIndex((cc) => cc.qid === c.qid)!;
                    const card = cards[ind]!;
                    const tmp = [...cards];
                    tmp[ind] = {
                      ...card,
                      prompt: p,
                      options: o,
                      answer: a,
                    };
                    setCards(tmp);
                  }}
                  transitionType={
                    !mounted
                      ? "slide-left"
                      : ignoreIds.find((cid) => cid === c.qid)
                        ? "slide-left"
                        : checkedIds.find((cid) => cid === c.qid)
                          ? "slide-right"
                          : undefined
                  }
                  onCross={() => {
                    setIgnoreIds([...ignoreIds, c.qid]);
                  }}
                  onCheck={() => {
                    setCheckedIds([...checkedIds, c.qid]);
                  }}
                  {...c}
                />
              ))}
            </Stack>
          </Center>
        </>
      )}

      <EditQuizDrawer open={opened} onClose={close} onSave={onCreate} />
    </Flex>
  );
}

export default CreateQuiz;
