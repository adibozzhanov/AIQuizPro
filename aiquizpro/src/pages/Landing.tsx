import { Button, Center, Input, Stack, Title } from "@mantine/core";

import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { useNavigate } from "react-router";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Landing() {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      return sleep(1000);
    },
    onSuccess: () => navigate("create"),
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mutate();
  };

  return (
    <form onSubmit={onSubmit} style={{ height: "100%" }}>
      <Stack h="100%" align="center" justify="center">
        <Center>
          <Title>Make a quiz</Title>
        </Center>
        <Input
          multiline
          rightSectionPointerEvents="auto"
          rightSection={<IconSearch type="submit" size={14} />}
          placeholder="Enter your topic"
        />
        <Button
          type="submit"
          loading={isPending}
          variant="gradient"
          gradient={{ from: "pink", to: "violet", deg: 125 }}
          rightSection={<IconPlus size={20} />}
          mx="auto"
        >
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default Landing;
