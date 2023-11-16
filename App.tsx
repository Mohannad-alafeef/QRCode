import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import Login from './components/Login';
import Admin from './components/AdminDashboard';
import student from './components/StudentDashboard';
import {customeTheme} from './Configs/CustomeTheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
const lightTheme = {
  ...DefaultLightTheme,
  colors: customeTheme.lightColors, // Copy it from the color codes scheme and then use it here
};
const darkTheme = {
  ...DefaultDarkTheme,
  colors: customeTheme.darkColors, // Copy it from the color codes scheme and then use it here
};
const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = {
  ...lightTheme,
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    ...lightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...darkTheme,
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...darkTheme.colors,
  },
};

function App(): JSX.Element {
  const userToken = (globalThis as any).user;
  const isStudent = (globalThis as any).student;
  const isAdmin = (globalThis as any).admin;
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <Stack.Navigator>
            {userToken == null && (
              <Stack.Screen
                name="login"
                component={Login}
                options={{headerShown: false}}
              />
            )}
            {isStudent == null && (
              <Stack.Screen
                name="admin"
                component={Admin}
                options={{headerShown: false}}
              />
            )}
            {isAdmin == null && (
              <Stack.Screen
                name="student"
                component={student}
                options={{headerShown: false}}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
