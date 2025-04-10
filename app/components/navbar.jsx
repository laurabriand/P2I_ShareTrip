import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, usePathname } from 'expo-router';

const Navbar = () => {
    const router = useRouter();

    // Pathname recovery to highlight the active button
    const pathname = usePathname();
    const getColor = (target) => (pathname === target ? '#6200EE' : '#aaa');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
                <Icon
                    name="airplane"
                    size={28}
                    color={pathname === '/' ? '#6200EE' : '#aaa'}
                />
                <Text style={[styles.navText, { color: getColor('/') }]}>projets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/archive')}>
                <Icon
                    name="archive-outline"
                    size={28}
                    color={pathname === '/archive' ? '#6200EE' : '#aaa'}
                />
                <Text style={[styles.navText, { color: getColor('/archive') }]}>archives</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
                <Icon
                    name="person"
                    size={28}
                    color={pathname === '/profile' ? '#6200EE' : '#aaa'}
                />
                <Text style={[styles.navText, { color: getColor('/profile') }]}>profil</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 15,
    },
});

export default Navbar;