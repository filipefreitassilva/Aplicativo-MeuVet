import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation } from "@react-navigation/native";

console.disableYellowBox = true;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    function isLogged() {
        if (firebase.auth().currentUser) {
            navigation.navigate('Home');
        }
    }

    async function logar() {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((value) => {
                alert('Bem-vindo!');
                navigation.navigate('Home');
            })
            .catch((error) => {
                alert(error.code);
            })

        setPassword('');
        setEmail('');
    }

    async function deslogar() {
        await firebase.auth().signOut();
        navigation.navigate('Inicio');
    }

    useEffect(() => { isLogged(); },[])
    
    return (
        <View style={styles.container}>
            <Image
                source={require('../../img/logo.png')}
                style={{ width: 150, height: 150, marginLeft: "auto", marginRight: "auto" }}
            />
            <Text style={styles.textTitle}>Entre e aproveite!</Text>

            <Text style={styles.txtInput}>E-mail</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setEmail(texto)}
                value={email}
            />

            <Text style={styles.txtInput}>Senha</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setPassword(texto)}
                value={password}
                secureTextEntry={true}
            />

            <Button
                marginTop={10}
                title="logar"
                onPress={logar}
            />

            {/* <Button
                marginTop={10}
                title="deslogar - teste"
                onPress={deslogar}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#70c543",
        paddingLeft: 35,
        paddingRight: 35
    },
    txtInput: {
        fontFamily: 'sans-serif-medium',
        marginTop: 5
    },
    textTitle: {
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        fontFamily: 'sans-serif-medium',
        textAlign: "center"
    },
    btnText: {
        paddingLeft: 10,
        color: "black"
    },
    btn: {

        marginTop: 10
    },
    input: {
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 2,
        marginBottom: 15
    }
})