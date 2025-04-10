
import { Slot } from 'expo-router';
import { View } from 'react-native';
import Navbar from '../components/navbar';

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
