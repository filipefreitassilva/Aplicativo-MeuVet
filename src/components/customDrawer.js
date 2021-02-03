import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from 'react-native';
import firebase from "../firebaseConection";
import { useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";


export default function customDrawer(props) {
    
    const user = firebase.auth().currentUser;
    
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ width: '100%', height: 70, alignItems: "center", justifyContent: "center", marginTop: 25 }}>
                <Image
                    source={require('../img/img-user.png')}
                    style={{ width: 65, height: 65 }}
                />
                <Text style={{ color: 'black', fontSize: 14, marginTop: 5, marginBottom:15}}>Bem-vindo {user.email}!</Text>
    
            </View>
            <DrawerItemList {...props} />
            
        </DrawerContentScrollView>
    )
}
