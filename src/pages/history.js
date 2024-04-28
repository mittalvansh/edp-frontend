import MainAppShell from "@/components/MainAppShell";
import { Grid, Card, Group, Text, Container, Stack, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Diagnosis() {
  return (
    <MainAppShell>
      <Container>
        <Group align="center" gap={5}>
          <IconChevronLeft size={36} />
          <Text c="#1F4145" size="1.5rem" fw={600}>
            History
          </Text>
        </Group>
        <Text fz={"h4"} fw={"bold"} m={"1rem"} c="#1F4145">Personal Details</Text>

        <Grid mt="1.5rem">
          <Grid.Col span={6}>
            <Stack>
              <Card
                padding="sm"
                radius={"md"}
                withBorder
              >
                <Card.Section bg={"#2396FF"}>
                  <Text p={"sm"} c={"white"} fw={"bold"} fz={"h4"}>
                    Common Cold
                  </Text>
                </Card.Section>

                <Text fw={500} size="sm" c="dimmed" mt="sm">
                  Prescribed Drug
                </Text>

                <Flex align={"center"} justify={"start"}>
                  <Text size="sm">
                    Sinarest 30mg-500mg Tablet
                  </Text>
                  <Stack w={"40%"} gap="xs">
                    <Text fw={"bold"} size={"0.85rem"} c="#1F4145">
                      x Twice a day
                    </Text>
                    <Text size={"0.8rem"} c="dimmed">
                      28th Feb 2024
                    </Text>
                  </Stack>
                </Flex>
              </Card>

            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Card
                padding="sm"
                radius={"md"}
                withBorder
              >
                <Card.Section bg={"#2396FF"}>
                  <Text p={"sm"} c={"white"} fw={"bold"} fz={"h4"}>
                    Common Cold
                  </Text>
                </Card.Section>

                <Text fw={500} size="sm" c="dimmed" mt="sm">
                  Prescribed Drug
                </Text>

                <Flex align={"center"} justify={"start"}>
                  <Text size="sm">
                    Sinarest 30mg-500mg Tablet
                  </Text>
                  <Stack w={"40%"} gap="xs">
                    <Text fw={"bold"} size={"0.85rem"} c="#1F4145">
                      x Twice a day
                    </Text>
                    <Text size={"0.8rem"} c="dimmed">
                      28th Feb 2024
                    </Text>
                  </Stack>
                </Flex>
              </Card>

            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </MainAppShell>
  );
}
