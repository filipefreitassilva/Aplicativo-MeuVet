import React, { useState, createContext, useEffect } from 'react';
import firebase from "../firebaseConection";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    //Funcao para logar o usario
    async function signIn(email, password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('usuarios').child(uid).once('value')
            .then((snapshot)=>{
                let data = {
                  uid: uid,
                  nome: snapshot.val().name,
                  email: value.user.email,
                };

                setUser(data);
                alert('Bem-vindo!');
            navigation.navigate('Home');
            })
            
        })
        .catch((error)=> {
            alert(error.code);
        });
    }
    
    //Cadastrar usuario
    async function signUp(email, password, nome){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: name
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                };
                setUser(data);
                // storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch((error)=> {
            alert(error.code);
            setLoadingAuth(false);
        });
    }




    async function signOut(){
        await firebase.auth().signOut();
        }
    

    return(
     <AuthContext.Provider value={{ signed: !!user , user, signUp, signIn, signOut }}>
         {children}
     </AuthContext.Provider>   
    );
}

export default AuthProvider;