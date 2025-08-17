// screens/HazardMap.jsx
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function HazardMap() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={require("../../assets/images/Back Arrow.png")} 
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* WebView */}
      <WebView 
        source={{ uri: "https://noah.up.edu.ph/noah-studio" }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40, 
    left: 15,
    zIndex: 10, 
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 50,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  webview: {
    flex: 1,
  },
});
