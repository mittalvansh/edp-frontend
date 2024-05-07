import React, { useState, useEffect, useRef } from "react";
import { useMediaRecorder } from "@/_hooks/useAudioRecorder";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Modal,
  Grid,
  Stack,
  Group,
  Text,
  TextInput,
  ActionIcon,
  Button,
  List,
} from "@mantine/core";
import {
  IconSend,
  IconCamera,
  IconChevronLeft,
  IconMicrophone,
  IconPlayerStop,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import Webcam from "react-webcam";
import axios from "axios";

const Symptoms = [
  "Fever",
  "Fatigue",
  "Headache",
  "Cough",
  "Sore Throat",
  "Runny Nose",
  "Chest Pain",
  "Diarrhea",
];

const DocChat = ({ page, setPage }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    mediaUrl,
    startRecording,
    stopRecording,
    deleteRecording,
    recordingState,
  } = useMediaRecorder();
  const audioRef = useRef(null);
  const webcamRef = useRef(null);
  const [value, setValue] = useState("");
  const [docChat, setDocChat] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tmp, setTmp] = useState(false);
  const temperature = localStorage.getItem("temperature");
  const bpm = localStorage.getItem("bpm");
  const spo2 = localStorage.getItem("spo2");

  const capture = async () => {
    const img = webcamRef.current.getScreenshot();

    close();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/chat/chat",
        {
          image: img,
          pulse_rate: bpm,
          temperature: temperature,
          oxygen_level: spo2,
        }
      );
      const arr = docChat;
      arr.push({ message: response.data.message, id: 2 });
      setDocChat(arr);
      setTmp(!tmp);
    } catch (error) {
      console.error("Error sending image message:", error);
    } finally {
      setLoading(false);
    }
  };

  async function uploadBlob(audioBlob, fileType) {
    const formData = new FormData();
    formData.append("audio_data", audioBlob, "file");
    formData.append("type", fileType || "wav");
    setLoading(true);
    // Your server endpoint to upload audio:
    const apiUrl = "http://localhost:8000/api/v1/chat/chat";
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        cache: "no-cache",
        body: formData,
      });

      const response2 = await axios.post(
        "http://localhost:8000/api/v1/chat/chat",
        {
          text: "",
          pulse_rate: bpm,
          temperature: temperature,
          oxygen_level: spo2,
        }
      );
      const arr = docChat;
      arr.push({ message: response2.data.message, id: 2 });
      setDocChat(arr);
      setLoading(false);
      return response.json();
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    if (mediaUrl) {
      const audioElement = new Audio(mediaUrl);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      audioRef.current = audioElement;

      const saveAudioToBackend = async () => {
        if (recordingState === "stopped" && mediaUrl) {
          try {
            const response = await fetch(mediaUrl);
            const blob = await response.blob();
            const fileType = "wav";
            const uploadResponse = await uploadBlob(blob, fileType);
            stopRecording();
            deleteRecording();
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      };

      saveAudioToBackend();

      return () => {
        audioElement.pause();
        audioElement.removeEventListener("ended", () => setIsPlaying(false));
        audioElement.src = "";
      };
    }
  }, [mediaUrl]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };
  const handleSubmit = async () => {
    if (value === "") {
      notifications.show({
        title: "Please enter a message",
        message: "Please enter a message to send",
        color: "red",
        autoClose: 5000,
      });
    } else {
      setLoading(true);
      setValue("");
      try {
        let arr = docChat;
        arr.push({ message: value, id: 1 });
        setDocChat(arr);
        const response = await axios.post(
          "http://localhost:8000/api/v1/chat/chat",
          {
            text: value,
            pulse_rate: bpm,
            temperature: temperature,
            oxygen_level: spo2,
          }
        );

        arr.push({ message: response.data.message, id: 2 });
        setDocChat(arr);
      } catch (error) {
        console.error("Error sending text message:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Box p="4rem">
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        title="Click a photo"
      >
        <Stack>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />

          <Button onClick={capture}>Capture</Button>
        </Stack>
      </Modal>
      <Group align="center" gap={5} mb="1.5rem">
        <IconChevronLeft
          size={56}
          cursor="pointer"
          onClick={() => {
            setDocChat([]);

            setValue([]);
            setPage(0);
          }}
        />
        <Text c="#1F4145" size="4rem" fw={600}>
          Doc Chat
        </Text>
      </Group>
      <Stack mt="3.5rem">
        <Stack
          justify="center"
          align="center"
          style={{
            border: "1px solid",
            borderRadius: "0.6rem",
            borderColor: "#D0D5DD",
          }}
          p="1.5rem"
        >
          <Text c="#1F4145" fz="2.5rem" fw="bold" mb="1rem">
            Some Common Symptoms
          </Text>
          <Grid w="100%" justify="center" align="center" px="1rem">
            {Symptoms.map((symptom, index) => (
              <Grid.Col key={index} span={3}>
                <Button
                  variant="outline"
                  color="#089BAB"
                  radius="xl"
                  style={{fontSize: "1.1rem"}}
                  w="100%"
                  onClick={() => {
                    setValue(value + " " + symptom);
                  }}
                >
                  {symptom}
                </Button>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
        {docChat.map((symptom, index) => (
          <Group key={index}>
            {symptom.id == 1 && (
              <Text bg="#EEF6F7" p="20px" mb="20px">
                {symptom.message}
              </Text>
            )}
            {symptom.id == 2 && (
              <Text bg="#089BAB" p="20px" mb="20px" c="#FFFFFF">
                <List gap="10px">
                  <List.Item>
                    <Text fw={600} size="24px" mb="10px">
                      Predicted Disease{" "}
                    </Text>
                    <Text mb="15px" size="21px" style={{ lineHeight: "24px" }}>
                      {symptom.message.predicted_disease}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb="10px">
                      Treatement Plan{" "}
                    </Text>
                    <Text mb="15px" size="21px" style={{ lineHeight: "24px" }}>
                      {symptom.message.treatment_plan}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb="10px">
                      Prescribed Drug{" "}
                    </Text>
                    <Text mb="15px" size="21px" style={{ lineHeight: "24px" }}>
                      {symptom.message.prescribed_drugs}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb="10px">
                      Specialization{" "}
                    </Text>
                    <Text mb="15px" size="21px" style={{ lineHeight: "24px" }}>
                      {symptom.message.specialization}
                    </Text>
                  </List.Item>
                </List>
              </Text>
            )}
          </Group>
        ))}

        <Group px="4rem" w="100%" pos="fixed" bottom="0.5rem" left="0">
          <TextInput
            w="85%"
            size="xl"
            value={value}
            radius="15px"
            variant="filled"
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Tell us how are you feeling"
            rightSection={
              <ActionIcon variant="transparent" c="#9CA0A0" size="xl">
                {!loading ? (
                  <IconSend onClick={handleSubmit} />
                ) : (
                  <IconPlayerStop />
                )}
              </ActionIcon>
            }
          />
          {!loading && (
            <>
              <ActionIcon
                variant="transparent"
                c="white"
                p={0}
                size="3.6rem"
                radius="50%"
                bg={recordingState === "recording" ? "#FF4545" : "#089BAB"}
                onClick={
                  recordingState === "recording"
                    ? stopRecording
                    : startRecording
                }
              >
                <IconMicrophone size="30px" />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                c="white"
                p={0}
                size="3.6rem"
                radius="50%"
                bg="#089BAB"
                onClick={open}
              >
                <IconCamera size="35px" />
              </ActionIcon>
            </>
          )}
        </Group>
      </Stack>
    </Box>
  );
};

export default DocChat;
