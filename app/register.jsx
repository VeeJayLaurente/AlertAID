import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role: "user", // default role
      });
      Alert.alert("Success", "Account created!");
      router.push("/login");
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/Logo.png")}
        style={{ width: 120, height: 120, alignSelf: "center", marginBottom: 30 }}
      />

      <Text style={styles.title}>Create an Account</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#FFF"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#FFF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#FFF"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <Text style={styles.loginPrompt}>
        Already have an account?{" "}
        <Link href="/login" style={styles.loginLink}>
          Login
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FF0000", paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  title: { color: "#FFF", fontSize: 30, fontWeight: "bold", marginBottom: 32, textAlign: "center" },
  input: { width: "100%", backgroundColor: "rgba(255, 255, 255, 0.2)", paddingVertical: 14, paddingHorizontal: 18, borderRadius: 10, marginBottom: 16, fontSize: 16, color: "white" },
  button: { backgroundColor: "#FFF", paddingVertical: 14, paddingHorizontal: 60, borderRadius: 30, marginTop: 10 },
  buttonText: { color: "#FF0000", fontSize: 18, fontWeight: "bold" },
  loginPrompt: { color: "#FFF", fontSize: 16, marginTop: 30, textAlign: "center" },
  loginLink: { fontWeight: "bold", textDecorationLine: "underline", color: "#FFF" },
});

export default RegisterScreen;
