import React, { useState } from "react";
import {
  Container,
  Image,
  Grid,
  Flex,
  Stack,
  Group,
  Select,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { DateInput } from "@mantine/dates";
import { IconEye, IconCalendar } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export default function Signup() {
  const [date, setDate] = useState(null);

  const isMobileView = useMediaQuery("(max-width: 840px)");

  const inputStyles = {
    input: {
      border: "none",
      borderBottom: "2px solid #1F4145",
      fontSize: "1.2em",
    },
  };
  const inputStyles_phone = {
    input: {
      border: "none",
      fontSize: "1.2em",
      borderBottom: "none",
    },
  };
  const selectStyles = {
    input: {
      border: "none",
      height: "42px",
      borderBottom: "2px solid #1F4145",
      fontSize: "1.2em",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <Container m={0} p={0} miw={"100%"}>
      <Grid gutter={0}>
        <Grid.Col
          bg="#089BAB"
          span={6}
          mih="100vh"
          style={{ borderRadius: "0 1.75rem 1.75rem 0" }}
        >
          <Stack justify="center" align="center" gap="2rem" h="100vh">
            <Image
              src="/welcome.svg"
              alt=""
              w={isMobileView ? "20rem" : "25rem"}
            />
            <Image
              src="/namaste.svg"
              alt=""
              w={isMobileView ? "15rem" : "20rem"}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group
            h="100vh"
            justify="center"
            align="center"
            px={isMobileView ? "2rem" : "0rem"}
            py={isMobileView ? "1rem" : "0rem"}
          >
            <Stack gap="0.5rem" miw="60%">
              <Text
                c="#1F4145"
                fz={isMobileView ? "2rem" : "2.5rem"}
                fw="600"
                mb="0.5rem"
              >
                Sign Up
              </Text>
              <form action="">
                <TextInput
                  type="text"
                  placeholder="Name"
                  styles={inputStyles}
                  mb={isMobileView ? "1rem" : "2rem"}
                  radius={0}
                />
                <Flex
                  direction={isMobileView ? "column" : "row"}
                  mb={isMobileView ? "1rem" : "2rem"}
                  gap="1rem"
                >
                  <DateInput
                    valueFormat="YYYY MMM DD"
                    placeholder="DOB"
                    radius={0}
                    rightSection={<IconCalendar />}
                    styles={selectStyles}
                  />
                  <Select
                    size="md"
                    styles={selectStyles}
                    radius={0}
                    placeholder="Gender"
                    data={["Male", "Female", "Other"]}
                  />
                </Flex>
                <Group
                  align="center"
                  mb={isMobileView ? "1rem" : "2rem"}
                  pb="2px"
                  style={{ borderBottom: "2px solid #1F4145" }}
                >
                  <Text
                    fz="1.2em"
                    style={{ borderRight: "2px solid", paddingRight: "0.5rem" }}
                  >
                    +91
                  </Text>
                  <TextInput
                    type="text"
                    placeholder="Phone Number"
                    styles={inputStyles_phone}
                    radius={0}
                  />
                </Group>
                <TextInput
                  type="text"
                  placeholder="Email address (Optional)"
                  styles={inputStyles}
                  mb={isMobileView ? "1rem" : "2rem"}
                  radius={0}
                />
                <TextInput
                  type="password"
                  placeholder="Password"
                  rightSection={<IconEye color={"black"} />}
                  styles={inputStyles}
                  radius={0}
                />
                <Button
                  type="submit"
                  color="#089BAB"
                  size={isMobileView ? "md" : "lg"}
                  mt="1.5rem"
                  mx="auto"
                  fullWidth
                >
                  Sign up
                </Button>
                <Text size="md" m="0.5rem" align="center">
                  Already have an account? &nbsp;
                  <Link
                    href="/login"
                    style={{ textDecoration: "none", color: "#089BAB" }}
                  >
                    Sign in
                  </Link>
                </Text>
              </form>
            </Stack>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
