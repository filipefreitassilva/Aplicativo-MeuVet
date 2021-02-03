import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PerfilList({ data}){
    return(
    <View style={styles.container}>
                   
            <Text style={styles.text}>Nome: {data.nome}</Text>
            <Text style={styles.text}>Email: {data.email}</Text>
            <Text style={styles.text}>Telefone: {data.telefone}</Text>
            <Text style={styles.text}>Endereço: {data.endereco}</Text>
            <Text style={styles.text}>Cidade: {data.cidade}</Text>
            <Text style={styles.text}>Estado: {data.estado}</Text>
            
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    text: {
      color:"black",
      fontSize: 20,
      marginBottom:10
    }
});