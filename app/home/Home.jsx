import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingHorizontal: 16, paddingTop: 40 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Image source={require('../../assets/images/Logo.png')} style={{ width: 50, height: 50 }} />
        <TouchableOpacity>
          <Image source={require('../../assets/images/Settings.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      
      {/* Dashboard */}
      <View style={{ backgroundColor: '#FF0000', padding: 20, borderRadius: 16 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>My Dashboard</Text>
        <Text style={{ color: 'white' }}>Usage Mode: Online</Text>
        <Text style={{ color: 'white' }}>Sync Settings: Active</Text>
      </View>
      
      {/* Safety Articles */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Safety Articles</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <View style={{ backgroundColor: '#E67E22', padding: 20, borderRadius: 12 }}>
          <Text style={{ color: 'white' }}>Heat Wave</Text>
        </View>
        <View style={{ backgroundColor: '#2980B9', padding: 20, borderRadius: 12 }}>
          <Text style={{ color: 'white' }}>Flash Floods</Text>
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FF0000', padding: 16 }}>
        <TouchableOpacity><Text style={{ color: 'white' }}>🏠</Text></TouchableOpacity>
        <TouchableOpacity><Text style={{ color: 'white' }}>🔔</Text></TouchableOpacity>
        <TouchableOpacity><Text style={{ color: 'white' }}>❗</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;