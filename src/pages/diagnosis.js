import MainAppShell from "@/components/MainAppShell";
import { Box, Grid, Stack, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Diagnosis() {
  return (
    <MainAppShell>
      <Box>
        <Group align="center" gap={5}>
          <IconChevronLeft size={36} />
          <Text c="#1F4145" size="1.5rem" fw={600}>
            Starting Diagnosis
          </Text>
        </Group>

        <Grid mt="1.5rem">
          <Grid.Col span={6}>
            <Stack gap="2rem">
              <Stack gap="1rem">
                <Text c="#1F4145" size="1.25rem" fw={600}>
                  Diagnosis
                </Text>
                <Text c="#1F4145" size="1rem">
                  We are starting with the diagnosis process. But first we need
                  to check your vitals
                </Text>
              </Stack>
              <Stack gap="1rem">
                <Text c="#089BAB" size="1.25rem" fw={600}>
                  Why?
                </Text>
                <Text c="#1F4145" size="1rem">
                  Checking Vitals is important for us as this helps us make sure
                  that the diagnosis we provide are more accurate.
                </Text>
              </Stack>
              <Text c="#1F4145" size="1rem" fw={300}>
                Note: We don't store any biometric information. This step only
                collects vital data important for better diagnosis.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
        </Grid>
      </Box>
    </MainAppShell>
  );
}
