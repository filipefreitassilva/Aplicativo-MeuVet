import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation, StackActions } from "@react-navigation/native";
import PetList from '../../PetList';
import Header from '../Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ListaPet(){
    const [pets, setPets] = useState([]);

    useEffect(()=> {
 
        async function loadPets(){
          const user = firebase.auth().currentUser.uid;
          await firebase.database().ref('animais').orderByChild('id_user').equalTo(user).on('value', (snapshot)=>{
            setPets([]);
      
            snapshot.forEach((childItem)=>{
              let data = {
                key: childItem.key,
                nome: childItem.val().nome,
                raca: childItem.val().raca
              };
      
              setPets(oldArray => [...oldArray, data]);
            })
      
      
          });
        }
      
        loadPets();
      
       }, []);

    const navigation = useNavigation();

    async function handleDelete(key){
      await firebase.database().ref('animais').child(key).remove();
    }

    return(
        <View style={style.container}>
            <Header/>
            <Text style={style.title}>Meus Animais</Text>
            
            <FlatList
            style={{marginLeft:15, marginRight: 15}}
            data={pets}
            keyExtractor={item => item.key}
            renderItem={ ({ item }) => (
            <PetList deleteItem={handleDelete} data={item}/>
            ) }
            />

            <TouchableOpacity style={ style.btnEdit} onPress={() => navigation.navigate('CadastroPet')}>
            <FontAwesome 
            name="plus-circle"
            size={25}
            color="white"
            />
            <Text style={ style.btnText}>Cadastrar Animal</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 25,
        marginBottom: 10
    },
    title:{
        fontSize:25,
        color: '#70c543',
        fontFamily: 'sans-serif-medium',
        marginLeft:"auto",
        marginRight: "auto",
        marginBottom: 10
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
      backgroundColor: "#29556E",
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
  btnText: {
    paddingLeft: 10,
    color: "white"
  },
});