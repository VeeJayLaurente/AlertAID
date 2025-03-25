import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';
import React from 'react';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          backgroundColor: '#FF0000',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/Home.png')}
              style={{ width: 30, height: 30, tintColor: focused ? 'white' : '#FFDADA' }}
            />
          ),
        }}
      />

      {/* Notifications */}
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/Bell.png')}
              style={{ width: 30, height: 30, tintColor: focused ? 'white' : '#FFDADA' }}
            />
          ),
        }}
      />

      {/* Alert (Center Button) */}
      <Tabs.Screen
        name="alert"
        options={{
          tabBarIcon: () => (
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'white',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Image
                source={require('../../assets/images/Alert.png')}
                style={{ width: 35, height: 35, tintColor: '#FF0000' }}
              />
            </View>
          ),
        }}
      />

      {/* Navigation */}
      <Tabs.Screen
        name="navigation"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/Compass.png')}
              style={{ width: 30, height: 30, tintColor: focused ? 'white' : '#FFDADA' }}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/profile.png')}
              style={{ width: 30, height: 30, tintColor: focused ? 'white' : '#FFDADA' }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
