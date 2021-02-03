import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation, StackActions } from "@react-navigation/native";
import PetList from '../../PetList';
import Header from '../Header';

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

    return(
        <View style={style.container}>
            <Header/>
            <Text style={style.title}>Meus Animais</Text>
            
            <FlatList
            style={{marginLeft:15, marginRight: 15}}
            data={pets}
            keyExtractor={item => item.key}
            renderItem={ ({ item }) => (
            <PetList data={item}/>
            ) }
            />

            <Button 
            title="Cadastrar Animal"
            onPress={()=> navigation.navigate('CadastroPet')}
            />
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
      }

});