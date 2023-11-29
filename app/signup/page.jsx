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
  Select,
  calendar
} from "@mantine/core";
import { useState } from "react";
import { DateInput } from '@mantine/dates';
import Link from "next/link";
import { IconEye } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

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
  const inputStyles2 = {
    input: {
      border: "none",
      fontSize: "1.2em",
      borderBottom:'none',
      width:"87%"
    },
  };
  const selectStyles = {
    input: {
      border: "none",
      height:"42px",
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
                Sign Up
              </Text>
              <form action="">
                <TextInput
                  type="text"
                  placeholder="Name"
                  styles={inputStyles}
                  mb="2rem"
                  radius={0}
                />
                <Stack style={{marginBottom:"2rem",display:"flex",flexDirection:"row",}}>
                 {/* <DateInput valueFormat="YYYY MMM DD" placeholder="DOB" radius={0} rightSection={<IconCalendar />} styles={selectStyles}/> */}
                 <TextInput valueFormat="YYYY MMM DD" placeholder="DOB" radius={0} rightSection={<IconCalendar />} styles={selectStyles}/>
                  <Select size="md" styles={selectStyles} radius={0}   placeholder="Gender" data={['Male', 'Female', 'Other']}/>
                </Stack>
                <Stack style={{display:"flex",
                  flexDirection:"row",
                  alignItems:'center',
                  alignContent:"center",
                  borderBottom:"2px solid #1F4145",
                  height:"36px",
                  marginBottom:"2rem",
                  paddingBottom:"2px",
                  justifyContent:"left",
                  gap:'0px'}}>
                  <Stack style={{borderRight:"2px solid",
                    width:'13%',
                    fontSize:"1.2em"}}>
                  +91 
                  </Stack>
                  <TextInput
                    type="text"
                    placeholder="Phone Number"
                    styles={inputStyles2}
                    radius={0}
                  />
                </Stack>
                <TextInput
                  type="text"
                  placeholder="Email address (Optional)"
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
                    Sign Up
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
