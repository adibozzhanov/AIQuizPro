import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Flex,
  SimpleGrid,
  Text,
  Transition,
} from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import EditQuizDrawer from "./EditQuizDrawer";
import { useDisclosure } from "@mantine/hooks";

interface IEditQuizCardProps {
  prompt: string;
  options: [string, string, string, string];
  answer: string;
  verified: boolean;
  transitionType: "slide-right" | "slide-left" | undefined;
  onCheck: () => void;
  onCross: () => void;
  onEdit: (
    prompt: string,
    options: [string, string, string, string],
    answer: string,
  ) => void;
}

function EditQuizCard({
  prompt,
  options,
  answer,
  verified,
  transitionType = undefined,
  onCheck,
  onCross,
  onEdit,
}: IEditQuizCardProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Transition
        mounted={!transitionType}
        transition={transitionType || "slide-left"}
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Card
            style={styles}
            withBorder
            w={{ sm: "25rem", md: "30rem" }}
            shadow="sm"
            padding="lg"
            radius="md"
          >
            <Flex mb="md" align="top" gap="0.5rem">
              <Text mr="auto" fw={500}>
                {prompt}
              </Text>
              {verified && <Badge color="green">Verified</Badge>}
              {!verified && (
                <>
                  <ActionIcon
                    title="Edit question"
                    variant="light"
                    size="md"
                    onClick={open}
                  >
                    <IconEdit />
                  </ActionIcon>
                </>
              )}
            </Flex>

            <SimpleGrid mb="1rem" cols={2} spacing="sm">
              {options.map((o) => (
                <Badge
                  size="xl"
                  radius="sm"
                  color={o === answer ? "green" : "blue"}
                  variant={o === answer ? "filled" : "outline"}
                >
                  {o}
                </Badge>
              ))}
            </SimpleGrid>
            <Card.Section withBorder inheritPadding py="xs">
              <Flex justify="center" align="center" gap="1rem">
                <Button color="green" onClick={() => onCheck()}>
                  <IconCheck />
                </Button>
                <Button color="red" onClick={() => onCross()}>
                  <IconX />
                </Button>
              </Flex>
            </Card.Section>
          </Card>
        )}
      </Transition>
      <EditQuizDrawer
        prompt={prompt}
        options={options}
        initialAnswer={answer}
        open={opened}
        onClose={close}
        onSave={onEdit}
      />
    </>
  );
}

export default EditQuizCard;
