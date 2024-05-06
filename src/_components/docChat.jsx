import React, { useState, useEffect, useRef, useCallback } from "react";
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
} from "@tabler/icons-react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [docChat, setDocChat] = useState([]);

  const capture = useCallback(() => {
    setImage(webcamRef.current.getScreenshot());
    close();
  }, [webcamRef]);

  async function uploadBlob(audioBlob, fileType) {
    const formData = new FormData();
    formData.append("audio_data", audioBlob, "file");
    formData.append("type", fileType || "wav");

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
          pulse_rate: 80,
          temperature: 98.6,
          blood_pressure: "120/80",
          oxygen_level: "90%",
        }
      );
      const arr = docChat;
      arr.push({ message: response2.data.message, id: 2 });
      setDocChat(arr);
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
            const fileType = "wav"; // Change this to 'wav' or any other desired file type
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
    if (value) {
      try {
        let arr = docChat;
        arr.push({ message: value, id: 1 });
        setDocChat(arr);
        const response = await axios.post(
          "http://localhost:8000/api/v1/chat/chat",
          {
            text: value,
            pulse_rate: 80,
            temperature: 98.6,
            blood_pressure: "120/80",
            oxygen_level: "90%",
          }
        );

        arr.push({ message: response.data.message, id: 2 });
        setDocChat(arr);
        setValue("");
      } catch (error) {
        console.error("Error sending text message:", error);
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
          <div key={index}>
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
                    <Text mb="15px" size="18px" style={{ lineHeight: "24px" }}>
                      {symptom.message.predicted_disease}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb="10px">
                      Treatement Plan{" "}
                    </Text>
                    <Text mb="15px" size="18px" style={{ lineHeight: "24px" }}>
                      {symptom.message.treatment_plan}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb="10px">
                      Prescribed Drug{" "}
                    </Text>
                    <Text mb="15px" size="18px" style={{ lineHeight: "24px" }}>
                      {symptom.message.prescribed_drugs}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb="10px">
                      specialization{" "}
                    </Text>
                    <Text mb="15px" size="18px" style={{ lineHeight: "24px" }}>
                      {symptom.message.specialization}
                    </Text>
                  </List.Item>
                </List>
              </Text>
            )}
          </div>
        ))}

        <Group
          px="4rem"
          w="100%"
          pos="fixed"
          bottom="1.5rem"
          left="0"
          // style={{ zIndex: 1000 }}
        >
          <TextInput
            w="88%"
            size="lg"
            value={value}
            variant="filled"
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Tell us how are you feeling"
            rightSection={
              <ActionIcon variant="transparent" c="#9CA0A0">
                <IconSend onClick={handleSubmit} />
              </ActionIcon>
            }
          />
          <ActionIcon
            variant="transparent"
            c="white"
            p={0}
            size="3.2rem"
            radius="50%"
            bg={recordingState === "recording" ? "#FF4545" : "#089BAB"}
            onClick={
              recordingState === "recording" ? stopRecording : startRecording
            }
          >
            <IconMicrophone />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            c="white"
            p={0}
            size="3.2rem"
            radius="50%"
            bg="#089BAB"
            onClick={open}
          >
            <IconCamera />
          </ActionIcon>
        </Group>
      </Stack>
    </Box>
  );
};

export default DocChat;