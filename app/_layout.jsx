import { SafeAreaView } from 'react-native-safe-area-context';
import { I18nextProvider } from "react-i18next";
import i18n from "../UI/i18n";
import { Stack } from 'expo-router'
import { useFonts} from 'expo-font'
import { useEffect } from 'react'
import { SplashScreen } from 'expo-router'
import { AppProvider } from "../UI/AppContext";
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

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
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // This will be overridden by individual screen handlers
      return false; // Let individual screens handle it
    });

    return () => backHandler.remove();
  }, []);

  
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
       <I18nextProvider i18n={i18n}>
        <AppProvider>
    <Stack>

      <Stack.Screen name="index" options={{
        headerShown:false , title: 'Home'
      }}/>

      <Stack.Screen name="welcomescreen" options={{
              headerShown:false , title: 'Welcome'
            }}/>

      <Stack.Screen name="welcomescreen2" options={{
              headerShown:false , title: 'Welcome2'
            }}/>

      <Stack.Screen name="login" options={{
                    headerShown:false , title: 'Login'
                  }}/>

      <Stack.Screen name="register" options={{
                    headerShown:false , title: 'Register'
                  }}/>

      <Stack.Screen name="forgotpassword" options={{
                    headerShown:false , title: 'ForgotPassword'
                  }}/>

      <Stack.Screen name="home" options={{
                    headerShown:false 
                  }}/>

      <Stack.Screen name="screens" options={{
                    headerShown:false 
                  }}/>

    </Stack>
    </AppProvider>
    </I18nextProvider>
  </SafeAreaView>
  )
}

export default MainLayout

