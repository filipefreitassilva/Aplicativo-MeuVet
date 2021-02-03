import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, Picker } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation } from "@react-navigation/native";

console.disableYellowBox = true;

export default function CadastroPet() {

  const navigation = useNavigation();
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [name, setName] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [tipo, setTipo] = useState('');
  
  const user = firebase.auth().currentUser.uid;



  async function cadastrar() {
    let animais = await firebase.database().ref('animais');
     let chave = animais.push().key;
 
     animais.child(chave).set({
        nome: name,
        sexo: sexo,
        raca: raca,
        altura: altura,
        peso: peso,
        tipo: tipo,
        id_user: user
      });
 
    
     alert('Animal adicionado com sucesso!');
        setName('');
        setSexo('');
        setRaca('');
        setAltura('');
        setTipo('');
        setPeso('');
        navigation.navigate('ListaPet');

  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <Image
          source={require('../../img/logo.png')}
          style={{ width: 150, height: 150, marginLeft: "auto", marginRight: "auto" }}
        />
        <Text style={styles.textTitle}>Preencha com os dados do seu Pet!</Text>

        <Text style={styles.txtInput}>Nome</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setName(texto)}
          value={name}
        />

        <Text style={styles.txtInput}>Sexo</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setSexo(texto)}
          value={sexo}
        />

        <Text style={styles.txtInput}>Raça</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setRaca(texto)}
          value={raca}
        />

        <Text style={styles.txtInput}>Altura</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setAltura(texto)}
          value={altura}
        />

        <Text style={styles.txtInput}>Peso</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setPeso(texto)}
          value={peso}
        />

        <Text style={styles.txtInput}>Tipo</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setTipo(texto)}
          value={tipo}
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