import React,{useState, useRef, useEffect} from 'react';
import 'react-native-gesture-handler';
import firebase from "../../firebaseConection";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import TaskList from '../../TaskList';
import Header from '../Header';

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

import Sobre from '../Sobre';
import Perfil from '../Perfil';
import ListaPet from '../ListaPet';
import customDrawer from '../../components/customDrawer'


function Home(){
  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState(''); 
  const [tasks, setTasks] = useState([]);
  const [key, setkey] = useState('');
 
  useEffect(()=> {
 
   async function loadTasks(){
    const user = firebase.auth().currentUser.uid;
     await firebase.database().ref('tarefas').orderByChild('id_user').equalTo(user).on('value', (snapshot)=>{
       setTasks([]);
 
       snapshot.forEach((childItem)=>{
         let data = {
           key: childItem.key,
           nome: childItem.val().nome
         };
 
         setTasks(oldArray => [...oldArray, data]);
       })
 
 
     });
   }
 
   loadTasks();
 
  }, []);
 
 
  async function handleAdd(){
    const user = firebase.auth().currentUser.uid;
    if(newTask !== ''){
 
     if(key !== ''){
       await firebase.database().ref('tarefas').child(key).update({
         nome: newTask,
       });
       Keyboard.dismiss();
       setNewTask('');
       setkey('');
       return;
     }
 
     let tarefas = await firebase.database().ref('tarefas');
     let chave = tarefas.push().key;
 
     tarefas.child(chave).set({
       nome: newTask,
       id_user: user
     });
 
     Keyboard.dismiss();
     setNewTask('');
 
    }
  }
 
  async function handleDelete(key){
    await firebase.database().ref('tarefas').child(key).remove();
  }
 
  function handleEdit(data){
    setNewTask(data.nome);
    setkey(data.key);
    inputRef.current.focus();
  }
 
 
  function cancelEdit(){
    setkey('');
    setNewTask('');
    Keyboard.dismiss();
  }
 
  return (

    <View style={styles.container}>
      <Header/>
      <Text style={styles.title}>Lembretes</Text>
 
     {key.length > 0 && (
     <View style={{flexDirection: 'row'}}>
       <TouchableOpacity onPress={cancelEdit}>
         <Icon name="times-circle" size={20} color="#FF0000" />
       </TouchableOpacity>
       <Text 
       style={{marginLeft: 5, marginBottom: 8, color: '#FF0000'}}
       >
         Você esta editando um lembrete!
       </Text>
     </View> 
     )}
      
     <View style={styles.containerTask}>
       <TextInput
       style={styles.input}
       placeholder="O que você tem que fazer hoje?"
       underlineColorAndroid="transparent"
       onChangeText={(texto) => setNewTask(texto) }
       value={newTask}
       ref={inputRef}
       />
       <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
         <Text style={styles.buttonText}>+</Text>
       </TouchableOpacity>
     </View>
 
     <FlatList
     data={tasks}
     keyExtractor={item => item.key}
     renderItem={ ({ item }) => (
       <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
     ) }
     />
 
    </View>
   );
}


export default function App(){

    return(
      <Drawer.Navigator
      drawerContent={customDrawer}
      >
        <Drawer.Screen name="Lembretes" component={Home}/>
        <Drawer.Screen name="Meus Animais" component={ListaPet}/>
        <Drawer.Screen name="Perfil" component={Perfil}/>
        <Drawer.Screen name="Sobre" component={Sobre}/>
      </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  containerTask:{
    flexDirection: 'row'
  },
  input:{
    flex:1,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 40,
    fontSize: 17
  },
  buttonAdd:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#70c543',
    paddingLeft: 14,
    paddingRight:14,
    marginLeft: 5,
  },
  buttonText:{
    fontSize: 23,
    color: '#FFF'
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