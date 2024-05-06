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
} from "@mantine/core";

export default function DiagnosisStepper({ page, setPage }) {
  const [active, setActive] = useState(0);
  const [temp, setTemp] = useState({});
  const [spo2bpm, setSpo2bpm] = useState({});
  useEffect(() => {
    if (active === 0) {
      getTemp();
    } else if (active === 1) {
      getbpmspo2();
    }
  }, [active]);

  const getTemp = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/sensors/temperature"
    );
    const data = await response.json();
    setTemp(data);
    setActive(1);
  };

  const getbpmspo2 = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/sensors/heart-rate"
    );
    const data = await response.json();
    setSpo2bpm(data);
  };

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
                    : "--"
                }
                completedIcon={
                  <Image src="/completedIcon.svg" h="100%" w="100%" />
                }
                icon={<Image src="/baseIcon.svg" h="100%" w="100%" />}
                color="#EDFCFE"
              />
              <Stepper.Step
                label="Heart Rate"
                description="--"
                completedIcon={
                  <Image src="/completedIcon.svg" h="100%" w="100%" />
                }
                icon={<Image src="/baseIcon.svg" h="100%" w="100%" />}
                color="#EDFCFE"
              />
              <Stepper.Step
                label="Oxygen Saturation"
                description="--"
                completedIcon={
                  <Image src="/completedIcon.svg" h="100%" w="100%" />
                }
                icon={<Image src="/baseIcon.svg" h="100%" w="100%" />}
                color="#EDFCFE"
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
    </Box>
  );
}
