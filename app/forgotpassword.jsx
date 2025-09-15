import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset link sent!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FF0000", paddingHorizontal: 24 }}>
      <Image source={require("../assets/images/Logo.png")}
        style={{ width: 120, height: 120, alignSelf: "center", marginBottom: 30 }}
      />

      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 16 }}>Forgot Password</Text>
      <Text style={{ color: "white", textAlign: "center", fontSize: 16, marginBottom: 20 }}>
        Enter your email and we will send you a link to reset your password.
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#FFF"
        value={email}
        onChangeText={setEmail}
        style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.2)", padding: 15, borderRadius: 8, marginBottom: 12, color: "white" }}
      />

      <TouchableOpacity style={{ backgroundColor: "white", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24 }}
        onPress={handleReset}>
        <Text style={{ color: "#FF0000", fontSize: 18, fontWeight: "bold" }}>Send Reset Link</Text>
      </TouchableOpacity>

      <Link href="/login" style={{ color: "white", fontSize: 16, marginTop: 20 }}>
        Remember your password? <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>Login</Text>
      </Link>
    </View>
  );
};

export default ForgotPasswordScreen;
