import {
  Button,
  Drawer,
  Fieldset,
  NativeSelect,
  Stack,
  TextInput,
} from "@mantine/core";
import { FormEvent, useState } from "react";

interface IEditQuizDrawerProps {
  prompt?: string;
  options?: [string, string, string, string];
  initialAnswer?: string;
  open: boolean;
  onClose: () => void;
  onSave: (
    prompt: string,
    options: [string, string, string, string],
    answer: string,
  ) => void;
}

function EditQuizDrawer({
  prompt,
  options,
  initialAnswer,
  open = true,
  onClose,
  onSave,
}: IEditQuizDrawerProps) {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(question, [option1, option2, option3, option4], answer);
    onClose();
  };

  const [question, setQuestion] = useState(prompt || "");
  const [option1, setOption1] = useState(options ? options[0] : "");
  const [option2, setOption2] = useState(options ? options[1] : "");
  const [option3, setOption3] = useState(options ? options[2] : "");
  const [option4, setOption4] = useState(options ? options[3] : "");
  const [answer, setAnswer] = useState(initialAnswer || "");

  return (
    <>
      <Drawer
        radius="md"
        offset={8}
        opened={open}
        onClose={onClose}
        title={!!prompt ? "Edit question" : "Create question"}
      >
        <form onSubmit={onSubmit}>
          <Stack>
            <Fieldset radius="md" mb="1rem">
              <TextInput
                required
                value={question}
                onChange={(e) => setQuestion(e?.currentTarget.value)}
                label="Question"
                placeholder="Prompt"
              />
              <TextInput
                required
                value={option1}
                onChange={(e) => setOption1(e?.currentTarget.value)}
                label="Option 1"
                placeholder="option"
                mt="md"
              />
              <TextInput
                required
                value={option2}
                onChange={(e) => setOption2(e?.currentTarget.value)}
                label="Option 2"
                placeholder="option"
                mt="md"
              />
              <TextInput
                required
                value={option3}
                onChange={(e) => setOption3(e?.currentTarget.value)}
                label="Option 3"
                placeholder="option"
                mt="md"
              />
              <TextInput
                required
                value={option4}
                onChange={(e) => setOption4(e?.currentTarget.value)}
                label="Option 4"
                placeholder="option"
                mt="md"
              />
              <NativeSelect
                required
                value={answer}
                onChange={(e) => setAnswer(e?.currentTarget.value)}
                data={[option1, option2, option3, option4]}
                label="Answer"
                mt="md"
              />
            </Fieldset>
            <Button mx="auto" type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}

export default EditQuizDrawer;
