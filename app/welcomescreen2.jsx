import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {Link} from 'expo-router'

const WelcomeScreen2 = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000', paddingHorizontal: 24, position: 'relative' }}>
      {/* Background Circles */}
      <View style={{ position: 'absolute', width: 400, height: 400, borderRadius: 400, borderWidth: 40, borderColor: 'rgba(255, 255, 255, 0.7)', bottom: 420, right: -250 }} />
      <View style={{ position: 'absolute', width: 400, height: 400, borderRadius: 400, borderWidth: 40, borderColor: 'rgba(255, 255, 255, 0.7)', bottom: -100, left: -250 }} />

      <Image source={require('../assets/images/decor-top.png')} style={{ position: 'absolute', top: -2, left: 0, width: 150, height: 150 }} />

      {/* Logo */}
      <Image source={require('../assets/images/Logo.png')} style={{ width: 150, height: 150, marginBottom: 16 }} />
      
      {/* Header Title */}
      <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>Fast. Reliable. Ready.</Text>
      
      {/* Sub-header */}
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 32 }}>
        Stay informed with real-time updates, access emergency resources, and connect directly with relief services to safeguard your community and loved ones.
      </Text>
      
      {/* Navigation Dots */}
      <View style={{ flexDirection: 'row', marginBottom: 32 }}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginHorizontal: 5 }} />
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white', marginHorizontal: 5 }} />
      </View>
      
      {/* Next Button */}
      <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 24, paddingVertical: 12, paddingHorizontal: 24, shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}>
        <Link href ="/login" style={{ color: '#FF0000', fontSize: 20, fontFamily: 'Inter-Bold' }}>Continue</Link>
      </TouchableOpacity>
      
      {/* White Line */}
      {/* <View style={{ position: 'absolute', bottom: 0, width: '200%', height: 30, backgroundColor: 'white' }} /> */}
    </View>
  );
};

export default WelcomeScreen2;
