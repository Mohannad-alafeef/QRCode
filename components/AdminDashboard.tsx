
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from  'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack =createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeScreen =()=>{
return(
  <Text>Home</Text>
)
}

const StudentsScreen =()=>{
  return(
    <Text>Home</Text>
  )}

function App(): JSX.Element {
  
  return (
  <>
    <Tab.Navigator barStyle={{backgroundColor:'white',}} activeColor='#abdcfa' >
        <Tab.Screen name='Home'component={HomeScreen} options={{tabBarIcon:(props)=>(<Icon name="home" size={20} color={'#abdcfa'} />)}}/>
        <Tab.Screen name='Student'component={StudentsScreen} options={{tabBarIcon:(props)=>(<Icon name="users" size={20}color={'#abdcfa'}/>)}}/>
    </Tab.Navigator> 
  </>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
