// components/Navbar.jsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, usePathname } from 'expo-router';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 10,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc',
        }}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/index')}>
                <Icon
                    name="airplane"
                    size={28}
                    color={pathname === '/(tabs)/index' ? '#6200EE' : '#aaa'}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(tabs)/archive')}>
                <Icon
                    name="archive-outline"
                    size={28}
                    color={pathname === '/(tabs)/archive' ? '#6200EE' : '#aaa'}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Icon
                    name="person"
                    size={28}
                    color={pathname === '/(tabs)/profile' ? '#6200EE' : '#aaa'}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Navbar;
