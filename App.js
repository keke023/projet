import { Camera, CameraType } from "expo-camera";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import PageMicro from "./Micro";
import React, { useState, useRef, useIsFocused } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import PageHome from "./Home";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const Tab = createBottomTabNavigator();

  requestPermission();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={PageHome}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={PageCamera}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <AntDesign name="camera" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Micro"
          component={PageMicro}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <FontAwesome name="microphone" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
const PageCamera = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef();

  async function capturePhoto() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      const photo = await cameraRef.current.takePictureAsync(options);
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      Alert.alert("Photo saved", `Photo saved to ${asset.uri}`);
    }
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function handleZoom(value) {
    setZoom((current) => Math.min(Math.max(current + value, 0), 1));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} zoom={zoom} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={capturePhoto} style={styles.button}>
            <Text style={styles.text}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleZoom(0.1)}
            style={styles.button}
          >
            <Text style={styles.text}>Zoom In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleZoom(-0.1)}
            style={styles.button}
          >
            <Text style={styles.text}>Zoom Out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
            <Text style={styles.text}>Flip cam</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
/*const PageHome = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
const PageMicro = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
*/
