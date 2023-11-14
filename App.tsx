
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login'
import Admin from './components/AdminDashboard'
import student from './components/StudentDashboard'
const Stack =createNativeStackNavigator();

function App(): JSX.Element {
  
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
    <Stack.Screen name='admin' component={Admin} options={{headerShown:false}}/>
    <Stack.Screen name='student' component={student} options={{headerShown:false}}/>
 </Stack.Navigator>
 </NavigationContainer> 
    
  );
}

const styles = StyleSheet.create({
 
});

export default App;
