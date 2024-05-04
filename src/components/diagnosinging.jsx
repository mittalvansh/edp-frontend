import {
  Box,
  Grid,
  Group,
  Text,
  Image,
  Stepper,
} from "@mantine/core";
import {
  IconChevronLeft,
} from "@tabler/icons-react";
import { useState } from "react";


export default function Diagnosing({ page, setPage }) {
  const [active, setActive] = useState(0);

  return (
    <Box>
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
              description="38.5"
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
            />
            <Stepper.Step
              label="Heart Rate"
              description="95 bmp"
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
            />
            <Stepper.Step
              label="Blood Pressure"
              description="Systolic: --  Diastolic: --"
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
            />
            <Stepper.Step
              label="Oxygen Saturation"
              description="--"
              completedIcon={
                <Image src="/Ellipse 12.svg" h={"100%"} w={"100%"} />
              }
              icon={<Image src="/Ellipse 15.svg" h={"100%"} w={"100%"} />}
              color="#EDFCFE"
            />
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
        </Grid.Col>
      </Grid>
    </Box>
  );
}
