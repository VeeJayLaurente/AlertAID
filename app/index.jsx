import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000', paddingHorizontal: 24, position: 'relative' }}>

<View style={{ position: 'absolute', width: 400, height: 400, borderRadius: 400, borderWidth: 40, borderColor: 'rgba(255, 255, 255, 0.7)', top: -100, left: -200 }} />
<View style={{ position: 'absolute', width: 400, height: 400, borderRadius: 400, borderWidth: 40, borderColor: 'rgba(255, 255, 255, 0.7)', bottom: -100, right: -250 }} />
      
      {/* Logo Placeholder - Replace with your actual image */}

      {/* Logo Placeholder - Replace with your actual image */}
      <Image source={require('../assets/images/Logo.png')} style={{ width: 150, height: 150, marginBottom: 16 }} />
      
      {/* App Title */}
      <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily:"Inter-Bold" , marginBottom: 8 }}>AlertAID</Text>
      
      {/* Subtitle */}
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 32, fontFamily:"Inter-Regular" }}>
        Fast Hotline and Online Help for Natural Disasters
      </Text>
      
      {/* Get Started Button */}
      <Link href="/welcomescreen" asChild>
        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 24, paddingVertical: 12, paddingHorizontal: 24, shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}>
          <Text style={{ color: '#FF0000', fontSize: 18, fontWeight: 'bold' }}>Get Started</Text>
        </TouchableOpacity>
      </Link>

      <View style={{ position: 'absolute', bottom: 0, width: '200%', height: 30, left: 1, backgroundColor: 'white' }} />

      
      {/* Custom Images at Bottom (Replace with your own) */}
      <View style={{ position: 'absolute', bottom: 16, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15 }}>
        <Image source={require('../assets/images/Ambulance.png')} style={{ width: 80, height: 50, marginTop: 135 }} />
        <Image source={require('../assets/images/Building.png')} style={{ width: 150, height: 150, marginTop: 45 }} />
      </View>
      
      <StatusBar style="light" />
    </View>
  );
}
