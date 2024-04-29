import {
  Box,
  Grid,
  Text,
  Avatar,
  Flex,
  Divider,
  Image,
  Button,
  AppShell
} from "@mantine/core";
import classes from "../styles/UserCardImage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the correct icon
import "@fortawesome/fontawesome-free/css/all.css";

export default function DefaultDashboard({page,setPage}) {
  return (
    
    <Grid mt="30px" align="start">
      <Grid.Col span={4}>
        <Box c="#F4FEFF" w="100%" align="start">
          <Flex align="center" gap="md">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
              size={60}
              radius={80}
              className={classes.avatar}
            />
            <Flex gap={5} justify="flex-start" direction="column">
              <Text c="#1F4145" size="24px" fw={600}>
                Adam
              </Text>
              <Text c="#9CA0A0" size="12px" fw={600}>
                25 years old, male
              </Text>
            </Flex>
          </Flex>
          <Grid w="198px" mt="20px">
            <Grid.Col span={4}>
              <Flex
                align="center"
                gap={5}
                justify="flex-start"
                direction="column"
              >
                <Text c="#101828" size="16px" fw={600}>
                  Blood
                </Text>
                <Text c="#089BAB" size="16px">
                  O+
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={4}>
              <Flex
                align="center"
                gap={5}
                justify="flex-start"
                direction="column"
              >
                <Text c="#101828" size="16px" fw={600}>
                  Height
                </Text>
                <Text c="#089BAB" size="16px">
                  O+
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={4}>
              <Flex
                align="center"
                gap={5}
                justify="flex-start"
                direction="column"
              >
                <Text c="#101828" size="16px" fw={600}>
                  Weight
                </Text>
                <Text c="#089BAB" size="16px">
                  O+
                </Text>
              </Flex>
            </Grid.Col>
          </Grid>
        </Box>
        <Divider my="md" />
        <Box>
          <Text c="#101828" size="16px" fw={600} mb="20px">
            Ongoing Treatments
          </Text>
          <Flex direction="column" gap="md">
            <Flex gap="sm" align="center">
              <Avatar radius="50%" bg="#2396FF" size="8px" />
              <Text size="12px" c="#000000">
                Common cold
              </Text>
              <Text c="#9CA0A0" size="12px">
                28th Feb,2024
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Grid.Col>
      <Grid.Col span={7} align="start" offset={1}>
        <Text c="#1F4145" size="24px" fw={600} mt="12px">
          Vitals
        </Text>
        <Divider my="md" />
        <Flex gap="sm">
          <Box align="left">
            <Box align="center">
              <Box pos="relative" align="center" w="117px" h="106px">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ width: "117px", height: "106px", color: "#FD5757" }}
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
        <Button
          mt="60px"
          w="172px"
          h="48px"
          radius="xl"
          bg="linear-gradient(90deg, #078871, #09AB8E)"
          pos="absolute"
          right="16px"
          onClick={()=>setPage(1)}
        >
          <Text size="16px" fw={600}>
            Start Diagnosis
          </Text>
        </Button>
      </Grid.Col>
    </Grid>
   
  );
}
