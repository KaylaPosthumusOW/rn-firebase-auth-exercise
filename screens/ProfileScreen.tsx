import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { getUserInfo, LogOutUser } from '../services/authService'

const ProfileScreen = () => {

    const handleLogout = () => {
        LogOutUser();
    }

    return (
        <SafeAreaView>
            <View style={{padding:20}}>
                <Text style={styles.title}>Profile Screen</Text>

                <Text style={styles.bodyText}>Email: {getUserInfo()?.email}</Text>
                <Text style={styles.bodyText}>Uid: {getUserInfo()?.uid}</Text>

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
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
})

export default ProfileScreen