import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Image } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation, StackActions } from "@react-navigation/native";
import Header from '../Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

            <Image
                    source={require('../../img/logomarca.png')}
                    style={{ width: '100%', height: '30%' }}
            />
            <Text style={style.text}>Aplicativo criado para apresentação do projeto final da disciplina de Trabalho de Conclusão de Curso.</Text>
            <Text style={style.text}>Filipe Freitas da Silva</Text>

            <TouchableOpacity style={ style.btn} onPress={deslogar}>
            <FontAwesome 
            name="sign-out"
            size={25}
            color="white"
            />
            <Text style={ style.btnText}>Sair</Text>
            </TouchableOpacity>

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
        fontSize:16,
        marginBottom:10
    },
    view: {
        margin:50,
        justifyContent:"center",
        alignItems:"center"
    },
    btnText: {
        paddingLeft: 10,
        color: "white"
      },
      btn: {
        width: 100,
        marginTop: 30,
        marginLeft: 'auto',
        marginRight:'auto',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "red",
        borderRadius: 16,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
      }
});