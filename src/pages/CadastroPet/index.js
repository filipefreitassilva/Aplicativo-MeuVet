import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Button, Image, ScrollView, Picker } from "react-native";
import firebase from "../../firebaseConection";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from 'react-native-image-picker';
import * as  Progress  from  'react-native-progress'
import storage from '@react-native-firebase/storage'

console.disableYellowBox = true;
  
export default function CadastroPet() {

  const navigation = useNavigation();
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [name, setName] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [tipo, setTipo] = useState('');
  
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const user = firebase.auth().currentUser.uid;

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    console.log("Teste" + image);
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    setUploading(true)
    try {
      await storage().ref(filename).putFile(uri);

      setUploading(false)
      alert("deu certo!")
    } catch (e){
      console.log(e)
    }

    setImage(null)
    
  };


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

    <SafeAreaView style={styles.container2}>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Selecione</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Carregar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>

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
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bbded6'
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
})