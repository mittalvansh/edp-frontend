import MainAppShell from "@/components/MainAppShell";
import React, { useState } from "react";
import {
  Grid,
  Flex,
  Stack,
  Group,
  Select,
  TextInput,
  Text,
  Button,
  Image
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendar, IconChevronDown, IconChevronLeft } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export default function Profile() {

  const [date, setDate] = useState(null);
  const [FirstName, setFirstName] = useState("Adam");
  const [LastName, setLasttName] = useState("Sanchez");
  const isMobileView = useMediaQuery("(max-width: 840px)");

  const inputStyles = {
    input: {
      fontSize: "1.4em",
    },
  };
  const inputStyles_phone = {
    input: {
      fontSize: "1.2em",
    },
  };
  const selectStyles = {
    input: {
      height: "42px",
      fontSize: "1.2em",
    },
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <MainAppShell>
      <Group align="center" gap={5}>
        <IconChevronLeft size={36} />
        <Text c="#1F4145" size="1.5rem" fw={600}>
          Profile
        </Text>
      </Group>
      <Flex py="1rem">
        <Flex direction="column" px="1rem">
          <Text fz={"h4"} fw={"bold"} c="#1F4145">Personal Details</Text>
          <Text fz={"h6"} c="dimmed" fs={"italic"}>Update your personal details here</Text>
        </Flex>
        {/* Add image here */}
      </Flex>
      <Grid gutter={0} p={0}>
        <Grid.Col >
          <Group
            justify="center"
            align="center"
            px="1rem"
          >
            <Stack gap="0.5rem" miw="60%">
              <form action="">
                <Flex justify={"space-evenly"}>
                  <TextInput
                    type="text"
                    label="First Name"
                    size="md"
                    value={FirstName}
                    styles={inputStyles}
                    mb={isMobileView ? "1rem" : "2rem"}
                    pr={"sm"}
                    radius={"sm"}
                  />
                  <TextInput
                    type="text"
                    label="Last Name"
                    size="md"
                    value={LastName}
                    styles={inputStyles}
                    mb={isMobileView ? "1rem" : "2rem"}
                    radius={"sm"}
                  />
                </Flex>
                <Flex
                  direction={isMobileView ? "row" : "row"}
                  mb={isMobileView ? "1rem" : "2rem"}
                  gap="1rem"
                >
                  <DateInput
                    valueFormat="DD-MM-YYYY"
                    label="Date of Birth"
                    value={new Date("06 04 2003")}
                    clearable
                    placeholder="DOB"
                    radius={"sm"}
                    rightSection={<IconCalendar />}
                    styles={selectStyles}
                    size="md"
                    w={"50%"}
                  />
                  <Group>
                    <TextInput
                      size="md"
                      w={"5rem"}
                      label="Age"
                      radius={"sm"}
                      value="21"
                      style={inputStyles}
                      placeholder="Age"
                    />
                    <Select
                      size="md"
                      label="Blood Group"
                      w={"6rem"}
                      value="O+"
                      radius={"sm"}
                      placeholder="Age"
                      data={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                      rightSection={<IconChevronDown />}
                    />
                  </Group>
                </Flex>
                <Flex
                  direction={isMobileView ? "row" : "row"}
                  mb={isMobileView ? "1rem" : "2rem"}
                  gap="1rem"

                >
                  <TextInput
                    type="text"
                    label="Phone Number"
                    value={"1234567890"}
                    placeholder="Phone Number"
                    styles={inputStyles_phone}
                    radius={"sm"}
                    size="md"
                    w={"50%"}
                  />
                  <Group >
                    <TextInput
                      size="md"
                      w={"6rem"}
                      label="Height"
                      radius={"sm"}
                      value="173 cm"
                      style={inputStyles}
                      placeholder="Age"
                    />
                    <TextInput
                      size="md"
                      label="Weight"
                      w={"6rem"}
                      value="65 Kg"
                      radius={"sm"}
                      placeholder="Age"
                    />
                  </Group>
                </Flex>
                <Flex gap={"md"} justify={"center"} align={"center"}>
                  <Button
                    type="submit"
                    color="#089BAB"
                    size={isMobileView ? "lg" : "lg"}
                    radius={"md"}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="submit"
                    color="#D9D9D9"
                    size={isMobileView ? "lg" : "lg"}
                    radius={"md"}
                    style={{ color: "black" }}
                  >
                    Cancel
                  </Button>
                </Flex>

              </form>
            </Stack>
          </Group>
        </Grid.Col>
      </Grid>
    </MainAppShell>
  );
}
