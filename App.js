import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './src/pages/Inicio';
import Login from './src/pages/Login';
import CadastroUser from './src/pages/CadastroUser';
import CadastroPet from './src/pages/CadastroPet';
import ListaPet from './src/pages/ListaPet';
import RecSenha from './src/pages/Recuperar';
import Home from './src/pages/Home';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CadastroUser" component={CadastroUser} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CadastroPet" component={CadastroPet} />
        <Stack.Screen name="ListaPet" component={ListaPet} />
        <Stack.Screen name="Recuperar" component={RecSenha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;