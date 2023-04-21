import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Fontisto } from "@expo/vector-icons";

export default function PageMicro() {
  const [recording, setRecording] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording saved to: ", uri);
    setAudioUri(uri);
  }

  async function playAudio() {
    try {
      console.log("Loading sound..");
      const { sound } = await Audio.Sound.createAsync({
        uri: audioUri,
      });
      setSound(sound);
      console.log("Playing sound..");
      await sound.playAsync();
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to play sound", err);
    }
  }

  async function stopAudio() {
    console.log("Stopping audio..");
    if (sound !== null) {
      await sound.stopAsync();
    }
    setIsPlaying(false);
  }

  return (
    <View style={styles.container}>
      {recording ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={stopRecording} style={styles.button}>
            <Text style={styles.text}>Stop Recording</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={startRecording} style={styles.button}>
            <Text style={styles.text}>Start Recording</Text>
          </TouchableOpacity>
        </View>
      )}

      {audioUri && !recording && (
        <View style={styles.buttonContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.labelPathText}>
              Chemin du dernier audio enregistrer{" "}
            </Text>
            <Text style={styles.pathText}> {audioUri}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fontisto name="arrow-down-l" size={48} color="black" />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={isPlaying ? stopAudio : playAudio}
              style={styles.button}
            >
              <Text style={styles.text}>
                {isPlaying ? "Stop Audio" : "Playback Audio"}{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    margin: 20,
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2196f3",
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  pathText: {
    marginTop: 10,
    color: "#555",
    fontSize: 12,
  },
  labelPathText: {
    color: "black",
    fontSize: 18,
    textAlign: "justify",
  },
});
