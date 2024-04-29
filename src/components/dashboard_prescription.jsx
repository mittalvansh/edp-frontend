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
  List,
  Table,
  TableData,
} from "@mantine/core";
import {
  IconCalendar,
  IconChevronDown,
  IconChevronLeft,
} from "@tabler/icons-react";

export default function DashboardPrescription({ page, setPage }) {
  const handlePrint = () => {
    // Get the medical-report div
    let medicalReportDiv = document.getElementById("prescription");
  
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
    <Box>
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
        bg="#BDD3D7"
        mt="20px"
        mr="20px"
        ml="30px"
        onClick={() => {
          setPage(1);
        }}
      >
        <Text size="16px" c="#101828" fw={600}>
          Medical Report
        </Text>
      </Button>
      <Button
        w="172px"
        h="48px"
        radius="xl"
        bg="#078871"
        mt="20px"
        onClick={() => {
          setPage(2);
        }}
      >
        <Text size="16px" fw={600}>
          Prescription
        </Text>
      </Button>

      <Box id="prescription">
        <Box align="center" mt="20px" mb="20px">
          <Text c="#1F4145" size="24px" fw={600}>
            HealthWiz AI
          </Text>
        </Box>
        <Flex direction="column" align="flex-end" gap="sm">
          <Text c="#9CA0A0" size="12px">
            PDPM IIITDMJ, Jabalpur
          </Text>
          <Text c="#9CA0A0" size="12px">
            482xxx,Near Dumna Airport Road
          </Text>
        </Flex>
        <Divider mt="20px" mb="20px" c="#000000" size="md" />
        <Flex justify="flex-end">
          <Text size="14px" c="#000000" fw={600}>
            Date: 5th November 2023
          </Text>
        </Flex>
        <Flex justify="flex-start" mt="20px" mb="20px">
          <Text size="12px" c="#000000">
            Weight (Kg): 65, Height (Cm): 173 (B.M.I = 20.00), BP:119/70mmHG
          </Text>
        </Flex>
        <Divider mt="20px" mb="10px" c="#000000" size="md" />
        <Grid>
          <Grid.Col span={5} offset={1}>
            <Text size="14px" c="#000000" fw={600}>
              Chief Complaints
            </Text>
          </Grid.Col>
          <Grid.Col span={5} offset={1}>
            <Text size="14px" c="#000000" fw={600}>
              Clinical Findings
            </Text>
          </Grid.Col>
        </Grid>
        <Divider mt="10px" mb="10px" c="#000000" size="md" />
        <Grid>
          <Grid.Col span={4} offset={1}>
            <List>
              <List.Item>
                <Text size="12px" c="#000000">
                  Weakness
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000">
                  Weakness
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000">
                  Weakness
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000">
                  Weakness
                </Text>
              </List.Item>
            </List>
          </Grid.Col>
          <Grid.Col span={5} offset={1}>
            <List>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
            </List>
          </Grid.Col>
        </Grid>
        <Divider mt="20px" mb="10px" c="#000000" size="md" />
        <Grid>
          <Grid.Col span={11} offset={1}>
            <Text size="14px" c="#000000" fw={600}>
              Diagnosis
            </Text>
          </Grid.Col>
          <Grid.Col span={5} offset={1}>
            <List>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
            </List>
          </Grid.Col>
        </Grid>
        <Divider mt="10px" mb="10px" c="#000000" size="md" />
        <Grid>
          <Grid.Col span={3} offset={1}>
            <Text size="14px" c="#000000" fw={600}>
              Medicine Name
            </Text>
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <Text size="14px" c="#000000" fw={600}>
              Dosage
            </Text>
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <Text size="14px" c="#000000" fw={600}>
              Duration
            </Text>
          </Grid.Col>
        </Grid>
        <Divider mt="10px" mb="10px" c="#000000" size="md" />
        <Grid>
          <Grid.Col span={3} offset={1}>
            <Text size="12px" c="#000000">
              1. TAB. ABCASDXC
            </Text>
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <Text size="12px" c="#000000">
              1 Morning
            </Text>
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <Text size="12px" c="#000000">
              8 Days Tot.: 8 Tabs
            </Text>
          </Grid.Col>
        </Grid>
        <Divider mt="10px" mb="10px" c="#000000" size="md" />
        <Grid>
          <Grid.Col span={3} offset={1}>
            <Text size="12px" c="#000000">
              1. TAB. ABCASDXC
            </Text>
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <Text size="12px" c="#000000">
              1 Morning
            </Text>
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <Text size="12px" c="#000000">
              8 DaysTot.: 8 Tabs
            </Text>
          </Grid.Col>
        </Grid>
        <Divider mt="10px" mb="40px" c="#000000" size="md" />
        <Grid mb="50px">
          <Grid.Col span={11} offset={1}>
            <List>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
              <List.Item>
                <Text size="12px" c="#000000" style={{ lineHeight: "17px" }}>
                  THESE ARE THETEST FINDINGS FOR A TEST PATIENT
                </Text>
              </List.Item>
            </List>
          </Grid.Col>
        </Grid>
      </Box>
      <Box justify="flex-end" mt="20px">
        <Button
          mt="60px"
          w="172px"
          h="48px"
          radius="xl"
          bg="linear-gradient(90deg, #078871, #09AB8E)"
          pos="fixed"
          right="16px"
          bottom="16px"
        >
          <Text size="16px" fw={600} onClick={handlePrint}>
            Get Print
          </Text>
        </Button>
      </Box>
    </Box>
  );
}
