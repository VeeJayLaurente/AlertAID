import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const InformationScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FF0000', paddingHorizontal: 16, paddingTop: 40 }}>
      {/* Header */}
      <TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20 }}>⬅ Back</Text>
      </TouchableOpacity>
      
      {/* Alert Hotlines */}
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 16, marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF0000' }}>ALERTAID HOTLINES</Text>
        <Text>Civil Security: +9912324143</Text>
        <Text>PNP Toledo City: +9912323121</Text>
        <Text>Toledo Hospital: +9978453621</Text>
        <Text>BFP Toledo City: +9945271376</Text>
        <Text>Toledo City Hall: +9932183443</Text>
      </View>
    </View>
  );
};

export default InformationScreen;
