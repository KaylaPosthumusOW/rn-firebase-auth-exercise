import { TextInput, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { loginUser, registerUser } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {

    const navigation: any = useNavigation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
      //   TODO: Login Function
    const register = () => {
        registerUser(email, password);
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
    
            <TextInput
                style={styles.inputField}
                placeholder="Your Email"
                onChangeText={newText => setEmail(newText)}
                defaultValue={email}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Your Password"
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={register}>
                <Text style={styles.buttonText}>Register Button</Text>
            </TouchableOpacity>
            <TouchableHighlight onPress={() => navigation.navigate('Login')} underlayColor='lightgray' style={{ margin: 20, padding: 10, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center' }}>Already have an account? Login Now</Text>
            </TouchableHighlight>
    
            {/* TODO: Add Register Navigation */}
    
          </View>  
          
        </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 30
    },
    inputField: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 15,
        paddingHorizontal: 10,
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