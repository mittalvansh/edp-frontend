import { ActionIcon, Group, Stack, TextInput, Text, Box, Menu, Flex, Grid, Button } from "@mantine/core";
// import { getHotkeyHandler } from "@mantine/hooks";
import { IconSend, IconChevronLeft, IconPlus, IconCamera, IconMicrophone } from "@tabler/icons-react";
import { useState } from "react";

const DocChat = ({ page, setPage }) => {
  const [value, setValue] = useState("");


  return (
    <Box>
      <Group align="center" gap={5} mb="20px">
        <IconChevronLeft size={36} />
        <Text c="#1F4145" size="1.5rem" fw={600}>
          Doc Chat
        </Text>
      </Group>
      <Stack justify="center" p={0} w="100%">
        <Stack w="100%" justify="center" align="center" style={{ border: "1px solid", borderRadius: "0.6rem", borderColor: "#D0D5DD" }} p="1rem">
          <Text c="#1F4145" fw="bold">Some Common Symmptoms</Text>
          <Grid w="100%" px="1rem" align="center" justify="center">
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Fever</Button></Grid.Col>
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Fatigue</Button></Grid.Col>
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Headache</Button></Grid.Col>
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Cough</Button></Grid.Col>
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Sore Throat</Button></Grid.Col>
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Runny Nose</Button></Grid.Col>
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Chest Pain</Button></Grid.Col>
            <Grid.Col span={3}><Button variant="outline" color="#089BAB" radius="xl">Diarrhea</Button></Grid.Col>
          </Grid>
        </Stack>
        {/* Add msg area */}
        <Group p="xs" align="end" w="100%">
          <TextInput
            w="88%"
            size="lg"
            value={value}
            variant="filled"
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Tell us how are you feeling"
            rightSection={
              <ActionIcon
                variant="transparent"
                c="#9CA0A0"
              >
                <IconSend />
              </ActionIcon>
            }
          // onKeyDown={
          //   !/\S/.test(value)
          //     ? undefined
          //     : value.length < 2
          //       ? undefined
          //       : getHotkeyHandler([["Enter", sendMessage]])
          // }
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
    </Box>
  );
};

export default DocChat;
