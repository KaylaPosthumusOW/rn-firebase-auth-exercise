import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { getUserInfo, LogOutUser } from '../services/authService'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        LogOutUser();
    }

    const navigateToObjects = () => {
        navigation.navigate('Objects' as never);
    }

    return (
        <SafeAreaView>
            <View style={{padding:20}}>
                <Text style={styles.title}>Profile Screen</Text>

                <Text style={styles.bodyText}>Email: {getUserInfo()?.email}</Text>
                <Text style={styles.bodyText}>Uid: {getUserInfo()?.uid}</Text>

                <TouchableOpacity style={styles.objectsButton} onPress={navigateToObjects}>
                    <Text style={styles.buttonText}>View My Objects</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 30,
        marginBottom: 10
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 5
    },
    button: {
        backgroundColor: "black",
        textAlign: 'center',
        padding: 10,
        marginTop: 30
    },
    objectsButton: {
        backgroundColor: "#007AFF",
        textAlign: 'center',
        padding: 10,
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
})

export default ProfileScreen