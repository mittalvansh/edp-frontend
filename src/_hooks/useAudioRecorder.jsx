import { useState, useEffect, useCallback } from "react";

export const useMediaRecorder = () => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [recordingState, setRecordingState] = useState("idle");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [error, setError] = useState(null);
  const [analyser, setAnalyser] = useState(null);

  useEffect(() => {
    return () => {
      mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
    };
  }, [mediaRecorder]);

  const createMediaBlob = useCallback((chunks, stream) => {
    const mediaBlob = new Blob(chunks, { type: "audio/webm" });
    const mediaUrl = URL.createObjectURL(mediaBlob);
    setMediaUrl(mediaUrl);
    setRecordingState("stopped");
    stream.getTracks().forEach((track) => track.stop());
  }, []);

  const startRecording = useCallback(async () => {
    if (recordingState !== "idle") return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();
      mediaStreamSource.connect(analyserNode);
      setAnalyser(analyserNode);

      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      let chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => createMediaBlob(chunks, stream);
      setMediaRecorder(recorder);
      recorder.start();
      setRecordingState("recording");
    } catch (err) {
      setError("Failed to start recording. Please ensure you have granted access.");
    }
  }, [recordingState, createMediaBlob]);

  const stopRecording = useCallback(() => {
    if (recordingState === "recording" && mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [recordingState, mediaRecorder]);

  const deleteRecording = useCallback(() => {
    if (mediaUrl) {
      URL.revokeObjectURL(mediaUrl);
      setMediaUrl(null);
      setRecordingState("idle");
    }
  }, [mediaUrl]);

  return {
    mediaUrl,
    recordingState,
    startRecording,
    stopRecording,
    deleteRecording,
    error,
    analyser,
  };
};
