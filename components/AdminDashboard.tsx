
import React from 'react';
import type {PropsWithChildren} from 'react';
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

const Stack =createNativeStackNavigator();

function App(): JSX.Element {
  
  return (
  <>
  <Text>Admin</Text>
  </>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
