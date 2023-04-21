import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const PageHome = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [microPermission, setMicroPermission] = useState(false);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status: cameraStatus } = await Camera.getCameraPermissionsAsync();
    const { status: microStatus } = await Audio.requestPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await MediaLibrary.requestPermissionsAsync();

    setCameraPermission(cameraStatus === "granted");
    setMicroPermission(microStatus === "granted");
    setMediaLibraryPermission(mediaLibraryStatus === "granted");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Liste des permissions
      </Text>
      <View style={styles.switchContainer}>
        <EvilIcons name="camera" size={36} color="black" />
        <Text>Camera Permission:</Text>

        <PermissionDot isActive={cameraPermission}></PermissionDot>
      </View>
      <View style={styles.switchContainer}>
        <FontAwesome5 name="microphone-alt" size={36} color="black" />

        <Text>Micro Permission:</Text>

        <PermissionDot isActive={microPermission}></PermissionDot>
      </View>
      <View style={styles.switchContainer}>
        <MaterialIcons name="perm-media" size={36} color="black" />
        <Text>Media Library Permission:</Text>

        <PermissionDot isActive={mediaLibraryPermission}></PermissionDot>
      </View>
      <Text>
        *Pour désactiver les permissions vous devez les désactiver dans les
        settings de votre appareil mobile
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconeContainer: {
    flexDirection: "row-reverse",
  },
});

export default PageHome;

const PermissionDot = ({ isActive }) => {
  const dotStyle = {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: isActive ? "green" : "red",
    marginLeft: 10,
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={dotStyle} />
      {isActive ? (
        <Text style={{ marginLeft: 5 }}>Granted</Text>
      ) : (
        <Text style={{ marginLeft: 5 }}>Not Granted</Text>
      )}
    </View>
  );
};
