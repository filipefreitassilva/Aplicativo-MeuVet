import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation, StackActions } from "@react-navigation/native";
import Header from '../Header';
import PerfilList from '../../PerfilList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

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
              setPerfil(data);
            });
      
      
          }
        loadPerfil();
      
       }, []);

       return(
         <ScrollView>
        <View style={style.container}>
            <Header/>
            <View style={style.view}>
            
            <Text style={style.title}>Meu Perfil</Text>

            <Image
                    source={require('../../img/img-user.png')}
                    style={{ width: 65, height: 65 }}
            />

          <View style={style.containerList}>
                   
                   <Text style={style.text}>
                       <Text style={{fontWeight: "bold"}}>Nome: </Text> 
                       {perfil.nome}
                   </Text>
                   <Text style={style.text}>
                       <Text style={{fontWeight: "bold"}}>E-mail: </Text> 
                       {perfil.email}
                   </Text>
                   <Text style={style.text}>
                       <Text style={{fontWeight: "bold"}}>Telefone: </Text>
                       {perfil.telefone}
                   </Text>
                   <Text style={style.text}>
                       <Text style={{fontWeight: "bold"}}>Endereço: </Text> 
                       {perfil.endereco}
                   </Text>
                   <Text style={style.text}>
                       <Text style={{fontWeight: "bold"}}>Cidade: </Text>
                       {perfil.cidade}
                   </Text>
                   <Text style={style.text}>
                       <Text style={{fontWeight: "bold"}}>Estado: </Text>
                       {perfil.estado}
                   </Text>
                   
           </View>

            <TouchableOpacity style={ style.btnEdit} onPress={() => navigation.navigate('CadastroUser')}>
            <FontAwesome 
            name="edit"
            size={25}
            color="white"
            />
            <Text style={ style.btnText}>Editar Perfil</Text>
            </TouchableOpacity>

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
        </ScrollView>
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
    },
    btnEdit: {
      width: 160,
      marginTop: 18,
      marginLeft: 'auto',
      marginRight:'auto',
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "blue",
      borderRadius: 16,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
    },
    containerList:{
      flex:1,
      flexDirection: 'column',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
  },
  text: {
    color:"black",
    fontSize: 20,
    marginBottom:10
  }
});