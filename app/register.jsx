import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import {Link} from 'expo-router'

const styles = {
    input: {
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: 15,
      borderRadius: 8,
      marginBottom: 12,
      color: 'white',
    },
    button: {
      backgroundColor: 'white',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 24,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
      color: '#FF0000',
      fontSize: 18,
      fontWeight: 'bold',
    },
  };

const RegisterScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000', paddingHorizontal: 24 }}>
      {/* Title */}
      <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 16 }}>Create an Account</Text>
      
      {/* Input Fields */}
      <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#FFF"/>
      <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#FFF"/>
      <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#FFF"/>
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} placeholderTextColor="#FFF"/>
      
      {/* Register Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      {/* Already have an account? */}
      <Link href ="/login" style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
        Already have an account? <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Login</Text>
      </Link>
    </View>
  );
};

export default RegisterScreen;
