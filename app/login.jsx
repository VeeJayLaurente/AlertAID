import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.push("/home/Home"); // ✅ Redirect after login
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#FF0000",
      paddingHorizontal: 20,
      paddingTop: 20,
      justifyContent: "center",
    }}>
      {/* Logo */}
      <Image
        source={require("../assets/images/Logo.png")}
        style={{ width: 120, height: 120, alignSelf: "center", marginBottom: 30 }}
      />

      {/* Title */}
      <Text style={{
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "center",
        marginBottom: 30,
      }}>
        Sign in on AlertAID
      </Text>

      {/* Email */}
      <Text style={{ color: "#FFF", fontSize: 16, marginBottom: 6 }}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#ddd"
        value={email}
        onChangeText={setEmail}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#FFF",
          color: "#FFF",
          fontSize: 16,
          paddingVertical: 8,
          marginBottom: 20,
        }}
      />

      {/* Password */}
      <Text style={{ color: "#FFF", fontSize: 16, marginBottom: 6 }}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#ddd"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#FFF",
          color: "#FFF",
          fontSize: 16,
          paddingVertical: 8,
          marginBottom: 30,
        }}
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#FFF",
          paddingVertical: 14,
          borderRadius: 30,
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FF0000" }}>Login</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <Text style={{
        color: "#FFF",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
      }}>
        Don’t have an account?{" "}
        <Link href="/register" style={{
          fontWeight: "bold",
          textDecorationLine: "underline",
          color: "#FFF",
        }}>
          Sign up
        </Link>
      </Text>

      {/* Forgot Password Link */}
      <Text style={{
        color: "#FFF",
        fontSize: 16,
        textAlign: "center",
        textDecorationLine: "underline",
        fontWeight: "bold",
      }}>
        <Link href="/forgotpassword">Forgot your password?</Link>
      </Text>
    </View>
  );
};

export default Login;
