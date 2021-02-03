import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation, StackActions } from "@react-navigation/native";
import Header from '../Header';
import PerfilList from '../../PerfilList';

export default function Perfil(){
    const navigation = useNavigation();
    const [perfil, setPerfil] = useState([]);
    const user = firebase.auth().currentUser.uid;

    async function deslogar() {
        await firebase.auth().signOut();
        navigation.navigate('Inicio');
    }

    useEffect(()=> {
 
        async function loadPerfil(){
          await firebase.database().ref('usuarios').child(user).on('value', (snapshot)=>{
              let data = {
                nome: snapshot.val().nome,
                email: snapshot.val().email,
                cidade: snapshot.val().cidade,
                estado: snapshot.val().estado,
                endereco: snapshot.val().endereco,
                telefone: snapshot.val().telefone,
              };
              setPerfil(oldArray => [...oldArray, data]);
            });
      
      
          }
        loadPerfil();
      
       }, []);

       return(
        <View style={style.container}>
            <Header/>
            <View style={style.view}>
            
            <Text style={style.title}>Meu Perfil</Text>

            <FlatList
            style={{marginLeft:15, marginRight: 15}}
            data={perfil}
            renderItem={ ({ item }) => (
            <PerfilList data={item}/>
            ) }
            />

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
    title:{
        fontSize:25,
        color: '#70c543',
        fontFamily: 'sans-serif-medium',
        marginLeft:"auto",
        marginRight: "auto",
        marginBottom: 10
      },
    view: {
        margin:10,
        justifyContent:"center",
        alignItems:"center"
    }
});