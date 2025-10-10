import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useBackHandler = (customHandler) => {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Get current route name
      const currentRoute = navigation.getState()?.routes[navigation.getState().index]?.name;
      
      // If we're not on Home screen, navigate to Home
      if (currentRoute !== 'Home') {
        navigation.navigate('Home');
        return true; // Prevent default back behavior
      }
      
      // If custom handler is provided, use it
      if (customHandler) {
        return customHandler();
      }
      
      // On Home screen, let the default behavior happen (exit app)
      return false;
    });

    return () => backHandler.remove();
  }, [navigation, customHandler]);
};