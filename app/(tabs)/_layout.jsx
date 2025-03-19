// import { Tabs } from 'expo-router';
// import React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';


// export default function TabLayout() {
//   return <Tabs
//     screenOptions={{
//       tabBarActiveTintColor: '#6200EE',
//     }}>
//     <Tabs.Screen
//       name="index"
//       options={{
//         title: 'Project',
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="airplane" color={color} size={size} />
//         ),
//         headerShown: false
//       }}
//     />
//     <Tabs.Screen
//       name="archive"
//       options={{
//         title: 'Archive',
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="archive-outline" color={color} size={size} />),
//         headerShown: false
//       }}
//     />

//     <Tabs.Screen
//       name="profile"
//       options={{
//         title: 'Profile',
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="person" color={color} size={size} />
//         ),
//         headerShown: false
//       }}
//     />
//   </Tabs>
// }

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Index from './index';
// import Archive from './archive';
// import Profile from './profile';
// import Activities from './activities'; // L'écran que vous voulez exclure de la barre de navigation

// const Tabs = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function TabNavigator() {
//   return (
//     <Tabs.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: '#6200EE',
//       }}
//     >
//       <Tabs.Screen
//         name="Projects"
//         component={Index}
//         options={{
//           title: 'Projects',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="airplane" color={color} size={size} />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tabs.Screen
//         name="Archive"
//         component={Archive}
//         options={{
//           title: 'Archive',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="archive-outline" color={color} size={size} />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tabs.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="person" color={color} size={size} />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tabs.Screen
//         name="Activities"
//         component={Activities}
//         options={{
//           tabBarButton: () => null, // Cache le bouton dans la barre de navigation
//           tabBarStyle: { display: 'none' },
//           headerShown: true, // Affiche l'en-tête si nécessaire
//           title: 'Gestion des Activités',
//         }}
//       />
//     </Tabs.Navigator>
//   );
// }

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Tabs"
//         component={TabNavigator}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Activities"
//         component={Activities}
//         options={{
//           headerShown: true,
//           title: 'Gestion des Activités',
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// app/_layout.jsx
import { Slot } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import Navbar from '../components/navbar'; // adapte le chemin selon ton arbo

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0ff' }}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <Navbar />
    </View>
  );
}
