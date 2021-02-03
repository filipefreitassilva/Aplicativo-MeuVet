import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import firebase from "./src/firebaseConection";

export default function App(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  async function cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((value)=> {
      alert('Usuário criado: ' + value.user.email);
    })
    .catch((error)=> {
      if(error.code === 'auth/weak-password'){
        alert('Sua senha deve ter pelo menos 6 caracteres');
        return;
      }
      if(error.code === 'auth/invalid-email'){
        alert('Email inválido');
        return;
      }
      else {
        alert('Algo deu errado!');
        return;
      }
    })

    setPassword('');
    setEmail('');
  }

  async function logar(){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((value)=> {
      alert('bem-vindo!: ' + value.user.email);
      setUser(value.user.email)
    })
    .catch((error)=> {
        alert('Algo deu errado!');
        return;
    })

    setPassword('');
    setEmail('');
  }

  async function deslogar(){
    await firebase.auth().signOut();
    setUser('');
  }

  return(
    <View style={{marginTop:20}}>
      <Text>E-mail</Text>
      <TextInput 
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setEmail(texto)}
      value={email}
      />

      <Text>Senha</Text>
      <TextInput 
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setPassword(texto)}
      value={password}
      />

    <Button 
    title="logar"
    onPress={logar}
    />

    <Text>{user}</Text>
{user.length > 0 ?
(
    <Button 
    title="logout"
    onPress={deslogar}
    />
) :
(
<Text>Nenhum logado!</Text>
)
}
    </View>
  );
}


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return(
    <View style={ styles.container}>
      <Text>Aplicativo Filipe</Text>
      <FontAwesome 
      name="home"
      size={35}
      color="red"
      />

      <FontAwesome 
      name="user"
      size={35}
      color="red"
      />

      <FontAwesome 
      name="paw"
      size={35}
      color="red"
      />

      <TouchableOpacity style={ styles.btnYoutube}>
      <FontAwesome 
      name="youtube"
      size={35}
      color="white"
      />
      <Text style={ styles.btnText}> Acessar Canal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    paddingLeft: 10,
    color: "white"
  }, 
  btnYoutube: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding:5,
    backgroundColor: "red",
    borderRadius: 5
  }
})


import React from 'react';
import 'react-native-gesture-handler';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

import Home from './src/pages/Home';
import Sobre from './src/pages/Sobre';
import customDrawer from './src/components/customDrawer'


export default function App(){

  return(
  <NavigationContainer>
    <Drawer.Navigator
    drawerContent={customDrawer}
    >
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Sobre" component={Sobre}/>
    </Drawer.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
 
})