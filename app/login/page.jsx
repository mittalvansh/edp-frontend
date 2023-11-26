"use client";
import {
  Container,
  Image,
  Grid,
  Stack,
  Group,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { IconEye } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export default function Login() {
  const isMobileView = useMediaQuery("(max-width: 840px)");

  const inputStyles = {
    input: {
      border: "none",
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
          <Group h="100vh" justify="center" align="center">
            <Stack gap="0.5rem" miw="60%">
              <Text
                c="#1F4145"
                fz={isMobileView ? "2rem" : "2.5rem"}
                fw="600"
                mb="1rem"
              >
                Login
              </Text>
              <form action="">
                <TextInput
                  type="text"
                  placeholder="Email or Phone"
                  styles={inputStyles}
                  mb="2rem"
                  radius={0}
                />
                <TextInput
                  type="password"
                  placeholder="Password"
                  rightSection={<IconEye color={"black"} />}
                  styles={inputStyles}
                  radius={0}
                />
                <Text
                  size="md"
                  mt="0.5rem"
                  mb="1rem"
                  align="right"
                  c="#2B3233"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Forgot password?
                </Text>
                <Button
                  type="submit"
                  color="#089BAB"
                  size={isMobileView ? "md" : "lg"}
                  mt="1.5rem"
                  mx="auto"
                  fullWidth
                >
                  Login
                </Button>
                <Text size="md" m="0.5rem" align="center">
                  Don&apos;t have an account? &nbsp;
                  <Link
                    href="/signup"
                    style={{ textDecoration: "none", color: "#089BAB" }}
                  >
                    Sign up
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
