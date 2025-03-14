import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  return <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#6200EE',
    }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Project',
        tabBarIcon: ({ color, size }) => (
          <Icon name="airplane" color={color} size={size} />
        ),
        headerShown: false
      }}
    />
    <Tabs.Screen
      name="archive"
      options={{
        title: 'Archive',
        tabBarIcon: ({ color, size }) => (
          <Icon name="archive-outline" color={color} size={size} />),
        headerShown: false
      }}
    />

    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="person" color={color} size={size} />
        ),
        headerShown: false
      }}
    />
  </Tabs>
}

