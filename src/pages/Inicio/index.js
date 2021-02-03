
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";



export default function Inicio() {
  const navigation = useNavigation();
  return(
    <View style={ styles.container}>
      <Image 
       source={require('../../img/logo.png')}
       style={{width:200, height: 200}}
      />
      <Text style={ styles.textTitle}>Bem-vindo ao Meu Pet!</Text>      

      <TouchableOpacity style={ styles.btn} onPress={() => navigation.navigate('Login')}>
      <FontAwesome 
      name="user"
      size={25}
      color="black"
      />
      <Text style={ styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.btn}onPress={() => navigation.navigate('CadastroUser')}>
      <FontAwesome 
      name="user-plus"
      size={25}
      color="black"
      />
      <Text style={ styles.btnText}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#70c543",
    fontFamily: 'sans-serif-medium'
  },
  textTitle:{
    fontSize:20,
    color: 'white',
    marginTop: 10,
    fontFamily: 'sans-serif-medium'
  },
  btnText: {
    paddingLeft: 10,
    color: "black"
  }, 
  btn: {
    width: 200,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
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
})