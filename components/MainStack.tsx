import React, {useEffect, useState, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './MainComponents/Login';
import QrScanner from './MainComponents/QrScanner';
import ProfilWebView from './MainComponents/ProfileWebView';

const Stack = createNativeStackNavigator();
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="QrScanner" component={QrScanner}></Stack.Screen>
      <Stack.Screen
        name="ProfileWebView"
        component={ProfilWebView}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default MainStack;
