import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { useFonts} from 'expo-font'
import { useEffect } from 'react'
import { SplashScreen } from 'expo-router'

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
     "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
     "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf"),
     "Jura-Bold": require("../assets/fonts/Jura-Bold.ttf"),
     "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
     "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf")
  });
  
  useEffect(() => {
    if (error) throw error;
  
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  
  if (!fontsLoaded && !error) {
    return null;
  }
  
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: '#000' }}>
    <Stack>

      <Stack.Screen name="index" options={{
        headerShown:false
      }}/>

      <Stack.Screen name="welcomescreen" options={{
              headerShown:false
            }}/>

      <Stack.Screen name="welcomescreen2" options={{
              headerShown:false
            }}/>

      <Stack.Screen name="login" options={{
                    headerShown:false
                  }}/>

      <Stack.Screen name="register" options={{
                    headerShown:false
                  }}/>

      <Stack.Screen name="forgotpassword" options={{
                    headerShown:false
                  }}/>

      <Stack.Screen name="home" options={{
                    headerShown:false
                  }}/>

    </Stack>
  </SafeAreaView>
  )
}

export default MainLayout

