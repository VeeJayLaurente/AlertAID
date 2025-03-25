import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000', paddingHorizontal: 24, position: 'relative' }}>
      {/* Background Circles */}
      <View style={{ position: 'absolute', width: 400, height: 400, borderRadius: 400, borderWidth: 40, borderColor: 'rgba(255, 255, 255, 0.7)', bottom: 420, left: -250 }} />
      <View style={{ position: 'absolute', width: 400, height: 400, borderRadius: 400, borderWidth: 40, borderColor: 'rgba(255, 255, 255, 0.7)', bottom: -100, right: -250 }} />
      
      {/* Decorative Element */}
      <Image source={require('../assets/images/decor-top.png')} style={{ position: 'absolute', top: 20, left: 0, width: 200, height: 200 }} />
      
      {/* App Logo */}
      <Image source={require('../assets/images/Logo.png')} style={{ width: 150, height: 150, marginBottom: 16 }} />
      
      {/* Welcome Text */}
      <Text style={{ color: 'white', fontSize: 30, fontFamily: 'Inter-Bold', textAlign: 'center', marginBottom: 8 }}>Welcome to AlertAID</Text>
      
      {/* Subtitle */}
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontFamily: 'Inter-Regular', marginBottom: 32 }}>
        Your trusted companion for disaster preparedness and emergency response.
      </Text>
      
      {/* Pagination Dots */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'white', marginHorizontal: 4 }} />
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginHorizontal: 4 }} />
      </View>
      
      {/* Navigation Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 50, marginBottom: 40 }}>
        <TouchableOpacity>
          <Link href ="/login" style={{ color: 'white', fontSize: 20, fontFamily: 'Inter-Regular', top: 10 }}>Skip</Link>
        </TouchableOpacity> 

      <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 100, alignItems: 'center', width: 100, height: 50, justifyContent: 'center' }}>
        <Link href ="/welcomescreen2" style={{ color: '#FF0000', fontSize: 20, fontWeight: 'bold'}}>Next</Link>
      </TouchableOpacity>

      </View>

      {/* White Line (Road) */}
      <View style={{ position: 'absolute', bottom: 0, width: '200%', height: 30, left: 1, backgroundColor: 'white' }} />
      
      <StatusBar style="light" />
    </View>
  );
}
