import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, Picker } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation } from "@react-navigation/native";

console.disableYellowBox = true;

export default function CadastroUser() {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');


  async function cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((value) => {
        //alert(value.user.uid);
        firebase.database().ref('usuarios').child(value.user.uid).set({
          nome: name,
          telefone: number,
          endereco: location,
          cidade: city,
          estado: state,
          email: email
        })

        alert('Usuario criado com sucesso!');
        setName('');
        setEmail('');
        setPassword('');
        setNumber('');
        setLocation('');
        setCity('');
        setState('');

        navigation.navigate('Login');
      })
      .catch((error) => {
        alert('Algo deu errado!');
      })
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <Image
          source={require('../../img/logo.png')}
          style={{ width: 150, height: 150, marginLeft: "auto", marginRight: "auto" }}
        />
        <Text style={styles.textTitle}>Preencha com seus dados!</Text>

        <Text style={styles.txtInput}>Nome</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setName(texto)}
          value={name}
        />

        <Text style={styles.txtInput}>Telefone</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setNumber(texto)}
          value={number}
          keyboardType="number-pad"
        />

        <Text style={styles.txtInput}>Endereço</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setLocation(texto)}
          value={location}
        />

        <Text style={styles.txtInput}>Cidade</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setCity(texto)}
          value={city}
        />

        <Text style={styles.txtInput}>Estado</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setState(texto)}
          value={state}
        />

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
          title="Cadastrar"
          onPress={cadastrar}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#70c543",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 30,
    paddingBottom: 30
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