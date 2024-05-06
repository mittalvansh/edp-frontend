import { Box, Flex, Grid, Stack, Text, Image, Button } from "@mantine/core";

export default function DiagnosisIntro({ page, setPage }) {
  return (
    <Box p="4rem">
      <Text c="#1F4145" size="5rem" fw={600}>
        Starting Diagnosis
      </Text>

      <Grid mt="3.5rem">
        <Grid.Col span={6}>
          <Stack gap="2rem">
            <Stack gap="1rem">
              <Text c="#1F4145" size="2.5rem" fw={600}>
                Diagnosis
              </Text>
              <Text c="#1F4145" size="2rem">
                We are starting with the diagnosis process. But first we need to
                check your vitals
              </Text>
            </Stack>
            <Stack gap="1rem">
              <Text c="#089BAB" size="2.5rem" fw={600}>
                Why?
              </Text>
              <Text c="#1F4145" size="2rem">
                Checking Vitals is important for us as this helps us make sure
                that the diagnosis we provide are more accurate.
              </Text>
            </Stack>
            <Text c="#1F4145" size="2rem" fw={400}>
              Note: We don't store any biometric information. This step only
              collects vital data important for better diagnosis.
            </Text>
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
            setPage(1);
          }}
        >
          Proceed
        </Button>
      </Flex>
    </Box>
  );
}
