import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PerfilList({ data}){
    return(
    <View style={styles.container}>
                   
            <Text style={styles.text}>
                <Text style={{fontWeight: "bold"}}>Nome: </Text> 
                {data.nome}
            </Text>
            <Text style={styles.text}>
                <Text style={{fontWeight: "bold"}}>E-mail: </Text> 
                {data.email}
            </Text>
            <Text style={styles.text}>
                <Text style={{fontWeight: "bold"}}>Telefone: </Text>
                {data.telefone}
            </Text>
            <Text style={styles.text}>
                <Text style={{fontWeight: "bold"}}>Endereço: </Text> 
                {data.endereco}
            </Text>
            <Text style={styles.text}>
                <Text style={{fontWeight: "bold"}}>Cidade: </Text>
                {data.cidade}
            </Text>
            <Text style={styles.text}>
                <Text style={{fontWeight: "bold"}}>Estado: </Text>
                {data.estado}
            </Text>
            
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
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