import {
  Text,
  Badge,
  Card,
  Flex,
  SimpleGrid,
  Transition,
  Button,
} from "@mantine/core";
import { IQuestion } from "../pages/QuizDetails";

interface ITakeQuizCardProps {
  question: IQuestion;
  mounted: boolean;
  onSelected: (ans: string) => void;
  selected?: string;
}

function TakeQuizCard({
  question,
  mounted,
  onSelected,
  selected,
}: ITakeQuizCardProps) {
  return (
    <Transition mounted={mounted} transition="slide-down">
      {(style) => (
        <Card
          style={style}
          withBorder
          w={{ sm: "18rem", md: "30rem" }}
          shadow="sm"
          padding="lg"
          radius="md"
        >
          <Flex mb="md" align="top" gap="0.5rem">
            <Text mr="auto" fw={500}>
              {question.prompt}
            </Text>
          </Flex>

          <SimpleGrid mb="1rem" cols={2} spacing="sm">
            {question.options.map((o) => (
              <Button
                onClick={() => onSelected(o)}
                size="lg"
                radius="sm"
                color={o === selected ? "pink" : "blue"}
                variant={o === selected ? "filled" : "outline"}
              >
                {o}
              </Button>
            ))}
          </SimpleGrid>
        </Card>
      )}
    </Transition>
  );
}

export default TakeQuizCard;
