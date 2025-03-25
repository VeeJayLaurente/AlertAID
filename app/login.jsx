import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import {Link} from 'expo-router'

const Login = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FF0000", padding: 20, justifyContent: "center" }}>
      
      {/* Logo */}
      <Image 
        source={require("../assets/images/Logo.png")}
        style={{ width: 120, height: 120, alignSelf: "center", marginBottom: 20 }}
      />
      
      {/* Header */}
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#FFF", textAlign: "center" }}>
        Sign in on AlertAID
      </Text>
      
      {/* Input Fields */}
      <Text style={{ color: "#FFF", fontSize: 16 }}>Username</Text>
      <TextInput 
        style={{
          borderBottomWidth: 1, 
          borderBottomColor: "#FFF", 
          color: "#FFF", 
          fontSize: 16, 
          paddingVertical: 5,
          marginBottom: 20
        }}
      />
      
      <Text style={{ color: "#FFF", fontSize: 16 }}>Password</Text>
      <TextInput 
        secureTextEntry
        style={{
          borderBottomWidth: 1, 
          borderBottomColor: "#FFF", 
          color: "#FFF", 
          fontSize: 16, 
          paddingVertical: 5,
          marginBottom: 20
        }}
      />
      
      {/* Login Button */}
      <TouchableOpacity 
        style={{
          backgroundColor: "#FFF", 
          paddingVertical: 12, 
          borderRadius: 25, 
          alignItems: "center", 
          marginBottom: 20
        }}>
        <Link href ="/home/Home" style={{ fontSize: 18, fontWeight: "bold", color: "#FF0000" }}>Login</Link>
      </TouchableOpacity>
      
      {/* Social Login */}
      <Text style={{ color: "#FFF", textAlign: "center", fontSize: 16, marginBottom: 15 }}>
        Or Login using social media
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', width: '80%', alignSelf: "center" }}>

        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 100, paddingVertical: 20, paddingHorizontal: 9, shadowOpacity: 0.2, shadowRadius: 4}}>
        <Image source={require("../assets/images/Facebook.png")} style={{ width: 50, height: 50, marginHorizontal: 10 }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 100, paddingVertical: 20, paddingHorizontal: 9, shadowOpacity: 0.2, shadowRadius: 4}}>
        <Image source={require("../assets/images/Twitter.png")} style={{ width: 50, height: 50, marginHorizontal: 10 }}/>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 100, paddingVertical: 20, paddingHorizontal: 9, shadowOpacity: 0.2, shadowRadius: 4}}>
        <Image source={require("../assets/images/Google.png")} style={{ width: 50, height: 50, marginHorizontal: 10 }} />
        </TouchableOpacity>

      </View>

       <Link href ='/register' style={{ position: 'relative', color: 'white', fontSize: 16, marginTop: 40, paddingHorizontal:105}}>
        Don't have an account? <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign up</Text>
       </Link>

       <Link href ='/forgotpassword' style={{ position: 'relative', color: 'white', fontSize: 16, marginTop: 40, paddingHorizontal:105, textDecorationLine: 'underline', fontWeight: 'bold'}}> Forgot your Password? 
       </Link>

    </View>
  );
};

export default Login;
