import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation, StackActions } from "@react-navigation/native";
import Header from '../Header';

export default function Sobre(){
    const navigation = useNavigation();

    async function deslogar() {
        await firebase.auth().signOut();
        navigation.navigate('Inicio');
    }
    return(
        <View style={style.container}>
            <Header/>
            <View  style={style.view}>
            <Text style={style.text}>Aplicativo criado para apresentação do projeto final da disciplina de Trabalho de Conclusão de Curso.</Text>
            <Text style={style.text}>Filipe Freitas da Silva</Text>

            <Button 
            title="Sair"
            onPress={deslogar}
            />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 15,
    },
    text: {
        textAlign: "center",
        fontSize:15,
        marginBottom:10
    },
    view: {
        margin:50,
        justifyContent:"center",
        alignItems:"center"
    }
});