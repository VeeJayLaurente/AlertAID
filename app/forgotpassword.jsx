import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import {Link} from 'expo-router'

const ForgotPasswordScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000', paddingHorizontal: 24 }}>
      {/* Title */}
      <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 16 }}>Forgot Password</Text>
      
      {/* Description */}
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, marginBottom: 20 }}>
        Enter your email address and we will send you a link to reset your password.
      </Text>
      
      {/* Email Input */}
      <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#FFF"/>
      
      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      
      {/* Back to Login */}
      <Link href ="/login" style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
        Remember your password? <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Login</Text>
      </Link>
    </View>
  );
};

export default ForgotPasswordScreen;

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
