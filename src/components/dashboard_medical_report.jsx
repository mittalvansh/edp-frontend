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
  Image,
  Box,
  Divider,
  Container,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconCalendar,
  IconChevronDown,
  IconChevronLeft,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import classes from "../styles/UserCardImage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the correct icon
import "@fortawesome/fontawesome-free/css/all.css";

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

const vitalsStyle = {
  Box: {
    border: "1px solid #E5E7EB",
  },
};

export default function DashboardMedicalReport({ page, setPage }) {
  const isMobileView = useMediaQuery("(max-width: 840px)");
  const handlePrint = () => {
    // Get the medical-report div
    let medicalReportDiv = document.getElementById("medical-report");

    // Create a new window for printing
    let printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              ${Array.from(document.styleSheets)
                .map((styleSheet) => {
                  try {
                    return Array.from(styleSheet.cssRules)
                      .map((cssRule) => cssRule.cssText)
                      .join("");
                  } catch (e) {
                    console.log("Error parsing CSS rules:", e);
                  }
                })
                .filter(Boolean)
                .join("\n")}
            </style>
          </head>
          <body>
            ${medicalReportDiv.outerHTML}
          </body>
        </html>
      `);

    // Print the contents of the new window
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Box p="25px">
      <Group align="center">
        <IconChevronLeft
          size={36}
          onClick={() => {
            setPage(0);
          }}
        />
        <Text c="#1F4145" size="1.5rem" fw={600}>
          Diagnosis
        </Text>
      </Group>
      <Button
        w="172px"
        h="48px"
        radius="xl"
        bg="#078871"
        mt="20px"
        mr="20px"
        ml="30px"
      >
        <Text
          size="16px"
          fw={600}
          onClick={() => {
            setPage(3);
          }}
        >
          Medical Report
        </Text>
      </Button>
      <Button
        w="172px"
        h="48px"
        radius="xl"
        bg="#BDD3D7"
        mt="20px"
        onClick={() => {
          setPage(4);
        }}
      >
        <Text size="16px" fw={600} c="#101828">
          Prescription
        </Text>
      </Button>
      <Box id="medical-report">
        <Box mt="20px" ml="30px" mb="30px">
          <Text size="20px" c="#1F4145" fw={600}>
            Patient Details
          </Text>
          <Flex justify={"start"} mt="20px">
            <TextInput
              type="text"
              label="Patient Name"
              size="md"
              styles={inputStyles}
              mb={isMobileView ? "1rem" : "2rem"}
              value="Adam Sanchez"
              pr={"sm"}
              radius={"sm"}
            />
            <TextInput
              size="md"
              w={"5rem"}
              mr="10px"
              label="Gender"
              radius={"sm"}
              value="Male"
              style={inputStyles}
              placeholder="Age"
            />
            <TextInput
              size="md"
              w={"5rem"}
              mr="10px"
              label="Age"
              radius={"sm"}
              value="21"
              style={inputStyles}
              placeholder="Age"
            />
            <TextInput
              size="md"
              label="Blood Type"
              w={"5rem"}
              value="O+"
              radius={"sm"}
              placeholder="Age"
            />
          </Flex>

          <Flex
            direction={isMobileView ? "row" : "row"}
            mb={isMobileView ? "1rem" : "2rem"}
            gap="1rem"
          >
            <Group>
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
        </Box>

        <Box ml="20px" mt="10px">
          <Text c="#1F4145" size="20px" fw={600} mb="20px">
            Recorder Vitals
          </Text>
          <Box
            style={{ border: "2px solid #000000", borderRadius: "25px" }}
            radius="25px"
            h="257px"
            w="338px"
            align="left"
          >
            <Flex gap="sm" mt="25px" ml="10px">
              <Box align="left">
                <Box align="center" mb="20px">
                  <Box pos="relative" align="center" w="117px" h="106px">
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{
                        width: "117px",
                        height: "106px",
                        color: "#FD5757",
                      }}
                    />
                    <Text
                      pos="absolute"
                      top="38px"
                      left="30px"
                      size="16px"
                      c="#FFFFFF"
                      fw={600}
                    >
                      120 BPM
                    </Text>
                  </Box>
                  <Text c="#101828" size="12px">
                    Heart Rate
                  </Text>
                </Box>
                <Image src="./img6.svg" w="158px" h="52px" mt="20x"></Image>
              </Box>
              <Box>
                <Box>
                  <Text size="12px" c="#101828" fw={600}>
                    Body Temperature
                  </Text>
                  <Text size="16px" mt="10px" c="#089BAB" fw={600}>
                    38.5
                  </Text>
                </Box>
                <Box mt="20px">
                  <Text size="12px" c="#101828" fw={600}>
                    Oxygen Saturation
                  </Text>
                  <Text size="16px" mt="10px" c="#089BAB" fw={600}>
                    38.5
                  </Text>
                </Box>
                <Box mt="20px">
                  <Text size="12px" c="#101828" fw={600}>
                    Blood Pressure
                  </Text>
                  <Flex mt="20px" gap="md">
                    <Box>
                      <Text size="8px" c="#101828" fw={600}>
                        Systolic
                      </Text>
                      <Text size="12px" mt="8px" c="#089BAB" fw={600}>
                        119 mm hg
                      </Text>
                    </Box>
                    <Box>
                      <Text size="8px" c="#101828" fw={600}>
                        Diastolic
                      </Text>
                      <Text size="12px" mt="8px" c="#089BAB" fw={600}>
                        120 mm hg
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box ml="20px" mt="30px">
          <Text c="#1F4145" size="20px" fw={600} mb="20px">
            Described Symptoms
          </Text>
          <Grid>
            <Grid.Col span={3}>
              <Flex
                w="128px"
                h="37px"
                radius="xl"
                align="center"
                justify="center"
                style={{ border: "2px solid #089BAB", borderRadius: "50px" }}
              >
                <Text size="16px" fw={600} c="#089BAB">
                  Weakness
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex
                w="128px"
                h="37px"
                radius="xl"
                align="center"
                justify="center"
                style={{ border: "2px solid #089BAB", borderRadius: "50px" }}
              >
                <Text size="16px" fw={600} c="#089BAB">
                  Weakness
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex
                w="128px"
                h="37px"
                radius="xl"
                align="center"
                justify="center"
                style={{ border: "2px solid #089BAB", borderRadius: "50px" }}
              >
                <Text size="16px" fw={600} c="#089BAB">
                  Weakness
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex
                w="128px"
                h="37px"
                radius="xl"
                align="center"
                justify="center"
                style={{ border: "2px solid #089BAB", borderRadius: "50px" }}
              >
                <Text size="16px" fw={600} c="#089BAB">
                  Weakness
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex
                w="128px"
                h="37px"
                radius="xl"
                align="center"
                justify="center"
                style={{ border: "2px solid #089BAB", borderRadius: "50px" }}
              >
                <Text size="16px" fw={600} c="#089BAB">
                  Weakness
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex
                w="128px"
                h="37px"
                radius="xl"
                align="center"
                justify="center"
                style={{ border: "2px solid #089BAB", borderRadius: "50px" }}
              >
                <Text size="16px" fw={600} c="#089BAB">
                  Weakness
                </Text>
              </Flex>
            </Grid.Col>
          </Grid>
        </Box>
        <Box ml="20px" mt="30px" mb="60px">
          <Text c="#1F4145" size="20px" fw={600} mb="20px">
            Possible Diagnosis
          </Text>
          <Text
            c="#1F4145"
            size="12px"
            fw={600}
            mb="20px"
            style={{ lineHeight: "20px" }}
          >
            These symptoms often align with respiratory infections, such as the
            COMMON COLD or FLU. The muscle and joint ache might also be
            associated with these viral infections. However, it's important to
            consider other potential causes, including allergies, stress, or
            underlying health conditions.
          </Text>
        </Box>
      </Box>
      <Button
        mt="60px"
        w="172px"
        h="48px"
        radius="xl"
        bg="linear-gradient(90deg, #078871, #09AB8E)"
        pos="fixed"
        right="16px"
        bottom="16px"
        onClick={handlePrint}
      >
        <Text size="16px" fw={600}>
          Get Print
        </Text>
      </Button>
    </Box>
  );
}
