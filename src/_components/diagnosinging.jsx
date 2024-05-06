import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Group,
  Text,
  Image,
  Stepper,
  Flex,
  Button, Paper
} from "@mantine/core";
import {
  IconChevronLeft,
} from "@tabler/icons-react";

export default function Diagnosing({ page, setPage }) {
  const [active, setActive] = useState(0);
  const [temp, setTemp] = useState({});
  const [spo2bpm, setSpo2bpm] = useState({});
  const [counter, setCounter] = useState(5);
  const [counterVisible, setCounterVisible] = useState(true);

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
        setCounterVisible(false)
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
    setCounter(5)
    setActive(1)

  }

  const getbpmspo2 = async () => {
    const response = await fetch("http://localhost:8000/api/v1/sensors/heart-rate");
    const data = await response.json();
    setSpo2bpm(data);
  }

  return (
    <Box p="25px">
      <Group align="center" gap={5} mb="20px">
        <IconChevronLeft size={36} />
        <Text c="#1F4145" size="1.5rem" fw={600}>
          Checking Vitals
        </Text>
      </Group>
      <Grid>
        <Grid.Col span={5} offset={1}>
          <Text c="#1F4145" fw={600} size="18px" mb="sm">
            Now measuring
          </Text>
          <Text c="#1F4145" size="12px">
            Body Temperature
          </Text>
          <Stepper
            active={active}
            onStepClick={setActive}
            mt="40px"
            orientation="vertical"
            color="#085D66"
          >
            <Stepper.Step
              label="Body temperature"
              description={Object.keys(temp).length > 0 ? "User Temperature" + temp.object_temperature + " Ambient Temperature" + temp.ambient_temperature : "--"}
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
              loading={active === 0}
            />
            {object.keys(spo2bpm).length == 0 && <Stepper.Step
              label="Heart Rate"
              description="--"
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
              loading={active === 1}
            />}
            {object.keys(spo2bpm).length == 0 && <Stepper.Step
              label="Oxygen Saturation"
              description="--"
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
              loading={active === 1}
            />}
            {object.keys(spo2bpm).length != 0 && <Stepper.Step
              label="Blood Pressure and Oxygen Saturation"
              description={"Blood Pressure per Minute" + spo2bpm.bpm + "Oxygen Saturation" + spo2bpm.spo2}
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
            />}

          </Stepper>
        </Grid.Col>
        <Grid.Col span={6} align="center">
          <Text
            c="#667085"
            size="12px"
            mb="10px"
            style={{ lineHeight: "20px" }}
          >
            Please keep your finger on the corresponding sensor that glows up.{" "}
          </Text>
          <Image
            src="/Fingerprint-bro.svg"
            alt=""
            h={"252px"}
            w={"272px"}
            mb="15px"
          />
          <Flex align='flex-end' justify='flex-end'>
            <Button
              w="172px"
              h="48px"
              radius="xl"
              bg="#078871"
              mt="20px"
              onClick={() => { setPage(2); }}
            >
              <Text size="16px" fw={600}>
                Next
              </Text>
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
      {counterVisible && <Paper w={450} shadow="xs" p="xl">
        <Text>{active == 0 ? "Place your finger on the Temperature Sensor" : "Place your Finger on the Heart Rate and Oxygen sensor"}</Text>
        <Text>
          {counter}
        </Text>
      </Paper>}
    </Box>
  );
}
