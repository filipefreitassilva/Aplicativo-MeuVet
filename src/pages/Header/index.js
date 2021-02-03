import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import {Container, ButtonMenu} from './styles';

export default function Header() {
 const navigation = useNavigation();

 return (
   <Container>
       <ButtonMenu onPress={ () => navigation.toggleDrawer() }>
         <Icon name="bars" color="#70c543" size={35} />
       </ButtonMenu>
   </Container>
  );
}