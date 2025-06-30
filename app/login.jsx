import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FF0000",
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: "center",
      }}
    >
      {/* Logo */}
      <Image
        source={require("../assets/images/Logo.png")}
        style={{
          width: 120,
          height: 120,
          alignSelf: "center",
          marginBottom: 30,
        }}
      />

      {/* Title */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#FFF",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Sign in on AlertAID
      </Text>

      {/* Username Field */}
      <Text style={{ color: "#FFF", fontSize: 16, marginBottom: 6 }}>
        Username
      </Text>
      <TextInput
        placeholder="Enter your username"
        placeholderTextColor="#ddd"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#FFF",
          color: "#FFF",
          fontSize: 16,
          paddingVertical: 8,
          marginBottom: 20,
        }}
      />

      {/* Password Field */}
      <Text style={{ color: "#FFF", fontSize: 16, marginBottom: 6 }}>
        Password
      </Text>
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#ddd"
        secureTextEntry
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
        style={{
          backgroundColor: "#FFF",
          paddingVertical: 14,
          borderRadius: 30,
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Link
          href="/home/Home"
          style={{ fontSize: 18, fontWeight: "bold", color: "#FF0000" }}
        >
          Login
        </Link>
      </TouchableOpacity>

      {/* Social Media Prompt */}
      <Text
        style={{
          color: "#FFF",
          textAlign: "center",
          fontSize: 16,
          marginBottom: 15,
        }}
      >
        Or login using social media
      </Text>

      {/* Social Login Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 100,
            padding: 10,
            elevation: 2,
          }}
        >
          <Image
            source={require("../assets/images/Facebook.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 100,
            padding: 10,
            elevation: 2,
          }}
        >
          <Image
            source={require("../assets/images/Twitter.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 100,
            padding: 10,
            elevation: 2,
          }}
        >
          <Image
            source={require("../assets/images/Google.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>

      {/* Signup Link */}
      <Text
        style={{
          color: "#FFF",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Don’t have an account?{" "}
        <Link
          href="/register"
          style={{
            fontWeight: "bold",
            textDecorationLine: "underline",
            color: "#FFF",
          }}
        >
          Sign up
        </Link>
      </Text>

      {/* Forgot Password Link */}
      <Text
        style={{
          color: "#FFF",
          fontSize: 16,
          textAlign: "center",
          textDecorationLine: "underline",
          fontWeight: "bold",
        }}
      >
        <Link href="/forgotpassword">Forgot your password?</Link>
      </Text>
    </View>
  );
};

export default Login;
