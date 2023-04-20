import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

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
      <View style={styles.switchContainer}>
        <Text>Camera Permission:</Text>
        <PermissionDot isActive={cameraPermission}></PermissionDot>
      </View>
      <View style={styles.switchContainer}>
        <Text>Micro Permission:</Text>
        <PermissionDot isActive={microPermission}></PermissionDot>
      </View>
      <View style={styles.switchContainer}>
        <Text>Media Library Permission:</Text>
        <PermissionDot isActive={mediaLibraryPermission}></PermissionDot>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
