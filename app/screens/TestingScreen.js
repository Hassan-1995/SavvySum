import React, { useRef } from "react";
import { View, Button } from "react-native";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const TestingScreen = () => {
  const viewShotRef = useRef();

  const captureAndShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      // Use expo-sharing to open WhatsApp with the image
      await Sharing.shareAsync(uri, {
        dialogTitle: "Share your screenshot",
        mimeType: "image/jpeg",
      });
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: "jpg", quality: 0.9 }}
        style={{ flex: 1 }}
      >
        {/* Content you want to capture */}
        <View style={{ backgroundColor: "lightblue", height: 300 }}>
          {/* This section will be captured */}
        </View>
      </ViewShot>
      <Button title="Capture and Share" onPress={captureAndShare} />
    </View>
  );
};

export default TestingScreen;
