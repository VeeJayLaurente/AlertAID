import React from 'react';
import { Tabs } from 'expo-router';
import { Image, View, StyleSheet } from 'react-native';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/Home.png')}
              style={[styles.icon, { tintColor: focused ? '#FFF' : '#FFDADA' }]}
            />
          ),
        }}
      />

      {/* Notifications Tab */}
      <Tabs.Screen
        name="info"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/Bell.png')}
              style={[styles.icon, { tintColor: focused ? '#FFF' : '#FFDADA' }]}
            />
          ),
        }}
      />

      {/* Alert Tab (Center Button) */}
      <Tabs.Screen
        name="alert"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.alertButton}>
              <Image
                source={require('../../assets/images/Alert.png')}
                style={styles.alertIcon}
              />
            </View>
          ),
        }}
      />

      {/* Navigation Tab */}
      <Tabs.Screen
        name="navigation"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/Compass.png')}
              style={[styles.icon, { tintColor: focused ? '#FFF' : '#FFDADA' }]}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/profile.png')}
              style={[styles.icon, { tintColor: focused ? '#FFF' : '#FFDADA' }]}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 100,
    backgroundColor: '#FF0000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  alertButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  alertIcon: {
    width: 35,
    height: 35,
    tintColor: '#FF0000',
  },
});

export default Layout;
