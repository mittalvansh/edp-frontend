import { useState } from "react";
import {
  Grid,
  Stack,
  Group,
  Text,
  TextInput,
  Menu,
  ActionIcon,
  Button,
} from "@mantine/core";
import {
  IconSend,
  IconPlus,
  IconCamera,
  IconChevronLeft,
  IconMicrophone,
} from "@tabler/icons-react";

const symptoms = [
  "Fever",
  "Fatigue",
  "Headache",
  "Cough",
  "Sore Throat",
  "Runny Nose",
  "Chest Pain",
  "Diarrhea",
];

const DocChat = ({ page, setPage }) => {
  const [value, setValue] = useState("");

  return (
    <>
      <Group align="center" gap={5} mb="1.5rem">
        <IconChevronLeft size={36} />
        <Text c="#1F4145" size="1.5rem" fw={600}>
          Doc Chat
        </Text>
      </Group>
      <Stack>
        <Stack
          justify="center"
          align="center"
          style={{
            border: "1px solid",
            borderRadius: "0.6rem",
            borderColor: "#D0D5DD",
          }}
          p="1rem"
        >
          <Text c="#1F4145" fw="bold">
            Some Common Symmptoms
          </Text>
          <Grid w="100%" justify="center" align="center" px="1rem">
            {symptoms.map((symptom, index) => (
              <Grid.Col key={index} span={3}>
                <Button variant="outline" color="#089BAB" radius="xl" w="100%">
                  {symptom}
                </Button>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>

        <Group p="xs" w="100%">
          <TextInput
            w="88%"
            size="lg"
            value={value}
            variant="filled"
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Tell us how are you feeling"
            rightSection={
              <ActionIcon variant="transparent" c="#9CA0A0">
                <IconSend />
              </ActionIcon>
            }
          />
          <Menu position="top" offset={0} radius="lg">
            <Menu.Target>
              <ActionIcon
                variant="transparent"
                c="white"
                p={0}
                size="3.2rem"
                radius="50%"
                bg="#089BAB"
              >
                <IconPlus />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown bg="#089BAB" p={0}>
              <Menu.Item p={0}>
                <ActionIcon
                  variant="transparent"
                  c="white"
                  p={0}
                  size="3.2rem"
                  radius="50%"
                  bg="#089BAB"
                >
                  <IconCamera />
                </ActionIcon>
              </Menu.Item>
              <Menu.Item p={0}>
                <ActionIcon
                  variant="transparent"
                  c="white"
                  p={0}
                  size="3.2rem"
                  radius="50%"
                  bg="#089BAB"
                >
                  <IconMicrophone />
                </ActionIcon>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Stack>
    </>
  );
};

export default DocChat;
