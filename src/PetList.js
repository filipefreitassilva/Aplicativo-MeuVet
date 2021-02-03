
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PetList({data}){
    return(
    <View style={styles.container}>
        <TouchableOpacity style={{marginRight: 10}}>
        <Icon name="paw" color="#FFF" size={20} />
      </TouchableOpacity>
     <View style={{}}>
          <TouchableWithoutFeedback>
          
            <Text style={{color: '#FFF'}}>{data.nome}</Text>
            
          </TouchableWithoutFeedback>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#70c543',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    }
});