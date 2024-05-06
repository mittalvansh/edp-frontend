import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Flex,
  Stack,
  Grid,
  Text,
  Image,
  Button,
  Paper
} from "@mantine/core";

export default function DiagnosisStepper({ page, setPage }) {
  const [active, setActive] = useState(0);
  const [temp, setTemp] = useState({});
  const [spo2bpm, setSpo2bpm] = useState({});
  const [counter, setCounter] = useState(10);


  useEffect(() => {
    const id = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          return prevCounter - 1;
        } else {
          return prevCounter;
        }
      });
    }, 1000);
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, []);


  useEffect(() => {
    console.log(counter)
    if (active === 0 && counter == 0) {
      getTemp();
    } else if (active === 1 && counter == 0) {
      getbpmspo2();
    }
  }, [active, counter]);


  const getTemp = async () => {
    const response = await fetch("http://localhost:8000/api/v1/sensors/temperature");
    const data = await response.json();
    setTemp(data);
    setCounter(10)
    setActive(1)

  }

  const getbpmspo2 = async () => {
    const response = await fetch("http://localhost:8000/api/v1/sensors/heart-rate");
    const data = await response.json();
    setSpo2bpm(data);
    setActive(3)
  }

  return (
    <Box p="4rem">
      <Text c="#1F4145" size="5rem" fw={600}>
        Checking Vitals
      </Text>

      <Grid mt="3.5rem">
        <Grid.Col span={6}>
          <Stack gap="0.25rem">
            <Text c="#1F4145" fw={600} size="3rem" mb="sm">
              Now measuring
            </Text>
            <Text c="#1F4145" size="2rem">
              Body Temperature
            </Text>
            <Stepper
              active={active}
              onStepClick={setActive}
              size="2.5rem"
              iconSize={52}
              mt="3rem"
              orientation="vertical"
              color="#085D66"
            >
              <Stepper.Step
                label="Body temperature"
                iconSize="4rem"
                description={
                  Object.keys(temp).length > 0
                    ? "User Temperature" +
                    temp.object_temperature +
                    " Ambient Temperature" +
                    temp.ambient_temperature
                    : "Monitoring Your Temperature"
                }
                completedIcon={
                  <Image src="/completedIcon.svg" h="100%" w="100%" />
                }
                icon={<Image src="/baseIcon.svg" h="100%" w="100%" />}
                color="#EDFCFE"
                loading={active === 0}
              />
              <Stepper.Step
                label="Heart Rate"
                description={Object.keys(spo2bpm).length == 0 ? active == 1 ? "Monitoring Your Heart Rate" : "--" : "Blood Per Minute - " + spo2bpm.bpm}
                completedIcon={
                  <Image src="/completedIcon.svg" h="100%" w="100%" />
                }
                icon={<Image src="/baseIcon.svg" h="100%" w="100%" />}
                color="#EDFCFE"
                loading={active === 1}
              />
              <Stepper.Step
                label="Oxygen Saturation"
                description={Object.keys(spo2bpm).length == 0 ? active == 1 ? "Monitoring Your Oxygen Saturation" : "--" : "Oxygen Saturation - " + spo2bpm.spo2}
                completedIcon={
                  <Image src="/completedIcon.svg" h="100%" w="100%" />
                }
                icon={<Image src="/baseIcon.svg" h="100%" w="100%" />}
                color="#EDFCFE"
                loading={active === 1}
              />
            </Stepper>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6} align="center">
          <Text c="#667085" size="2rem" mb="1rem" ta="right">
            Please keep your finger on the corresponding sensor that glows up.{" "}
          </Text>
          <Image src="/fingerprint.svg" alt="" h="400px" w="400px" />
        </Grid.Col>
      </Grid>
      <Flex w="100%" justify="flex-end" align="flex-end">
        <Button
          radius="xl"
          size="xl"
          bg="#078871"
          mt="20px"
          onClick={() => {
            setPage(2);
          }}
        >
          Next
        </Button>
      </Flex>
      <Paper w={450} shadow="xs" p="xl">
        <Text>{active == 0 ? "Place your finger on the Temperature Sensor" : "Place your Finger on the Heart Rate and Oxygen sensor"}</Text>
        <Text>
          {counter}
        </Text>
      </Paper>
    </Box>
  );
}
