import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation } from "@react-navigation/native";

console.disableYellowBox = true;

export default function Recuperar() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    function isLogged() {
        if (firebase.auth().currentUser) {
            navigation.navigate('Home');
        }
    }

    async function recuperarSenha() {
        await firebase.auth().sendPasswordResetEmail(email)
            .then((value) => {
                alert('E-mail enviado!');
                navigation.navigate('Login');
            })
            .catch((error) => {
                alert(error.code);
            })

        setPassword('');
        setEmail('');
    }

    

    useEffect(() => { isLogged(); },[])
    
    return (
        <View style={styles.container}>
            <Image
                source={require('../../img/logo.png')}
                style={{ width: 150, height: 150, marginLeft: "auto", marginRight: "auto" }}
            />
            <Text style={styles.textTitle}>Digite seu E-mail, iremos enviar um link para redefinição de senha!</Text>

            <Text style={styles.txtInput}>E-mail</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setEmail(texto)}
                value={email}
            />

    
            <Button
                marginTop={10}
                title="Recuperar senha"
                onPress={recuperarSenha}
            />

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
        marginTop: 5,
        fontSize: 14
    },
    textTitle: {
        fontSize: 17,
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
    },
    buttonRec: {
        marginTop: 30
    }
})