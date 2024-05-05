import { useState, useEffect, useRef, useCallback } from "react";
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
      const arr=docChat;
      arr.push({"message":response2.data.message,"id":2});
      setDocChat(arr);
      console.log(response2);
      return response.json();
    } catch (error) {
      console.error("Error", error);
    }
  }
  console.log(docChat)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    if (mediaUrl) {
      const audioElement = new Audio(mediaUrl);
      console.log(audioElement);
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
            console.log("File uploaded:", uploadResponse);
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
        let arr=docChat;
        arr.push({"message":value,"id":1});
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
        console.log(arr)
        arr.push({"message":response.data.message,"id":2});
        console.log(arr)
        setDocChat(arr);
        setValue("");
        
        console.log(response);
      } catch (error) {
        console.error("Error sending text message:", error);
      }
    }
  };
  return (
    <Box p="25px">
      <Modal
        opened={opened}
        onClose={close}
        size="sm"
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
          size={36}
          onClick={() => {
            setDocChat([]);
            
            setValue([]);
            setPage(0);
          }}
        />
        <Text c="#1F4145" size="1.5rem" fw={600}>
          Doc Chat
        </Text>
      </Group>
      <Stack>
        <Stack
          justify="center"
          align="center"
          style={{
            border: "1px solid",
            borderRadius: "0.6rem",
            borderColor: "#D0D5DD",
          }}
          p="1rem"
        >
          <Text c="#1F4145" fw="bold">
            Some Common Symmptoms
          </Text>
          <Grid w="100%" justify="center" align="center" px="1rem">
            {Symptoms.map((symptom, index) => (
              <Grid.Col key={index} span={3}>
                <Button variant="outline" color="#089BAB" radius="xl" w="100%" onClick={()=>{setValue(value+' '+symptom)}}>
                  {symptom}
                </Button>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
        {docChat.map((symptom, index) => (
          <div key={index}>
            {symptom.id==1 && <Text bg="#EEF6F7" p="20px" mb="20px">
              {symptom.message}
            </Text>}
            {symptom.id==2 && (
              <Text bg="#089BAB" p="20px" mb="20px" c="#FFFFFF">
                <List gap="10px">
                  <List.Item >
                    <Text fw={600} size="24px" mb='10px'>Predicted Disease </Text>
                    <Text mb="15px" size="18px" style={{lineHeight:"24px"}}>{symptom.message.predicted_disease}</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb='10px'>Treatement Plan </Text>
                    <Text mb="15px" size="18px" style={{lineHeight:"24px"}}>{symptom.message.treatment_plan}</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb='10px'>Prescribed Drug </Text>
                    <Text mb="15px" size="18px" style={{lineHeight:"24px"}}>{symptom.message.prescribed_drugs}</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size="24px" mb='10px'>specialization </Text>
                    <Text mb="15px" size="18px" style={{lineHeight:"24px"}}>{symptom.message.specialization}</Text>
                  </List.Item>
                </List>
              </Text>

            )}
          </div>
        ))}

        <Group p="xs" w="100%">
          <TextInput
            w="80%"
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

          {/* {mediaUrl && (
            <>
              <button
                id="play-audio"
                className={`p-3 ${
                  isPlaying ? "bg-red-500" : "bg-blue-500"
                } text-white rounded-full`}
                onClick={togglePlayback}
                aria-label={isPlaying ? "Pause playback" : "Play recording"}
              >
              {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
              </button>
            </>
          )} */}
        </Group>
      </Stack>
    </Box>
  );
};

export default DocChat;
