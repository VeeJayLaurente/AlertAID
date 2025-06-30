import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Link } from 'expo-router';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      {/* Title */}

       <Image
              source={require("../assets/images/Logo.png")}
              style={{
                width: 120,
                height: 120,
                alignSelf: "center",
                marginBottom: 30,
              }}
            />

      <Text style={styles.title}>Create an Account</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#FFF"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#FFF"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#FFF"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#FFF"
        secureTextEntry
        style={styles.input}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button}>
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
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
  },
  loginLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#FFF',
  },
});

export default RegisterScreen;
