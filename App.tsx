import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
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
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import Login from './components/Login';
import {customeTheme} from './Configs/CustomeTheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {login} from './Services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './Configs/AuthContext';
import jwt_decode from 'jwt-decode';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
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
  function handleToken(token: any) {
    if (token.roleId == 1) {
      console.log('Admin');

      setAuth(prev => ({
        ...prev,
        isAdmin: true,
        isStudent: false,
        userToken: token,
      }));
    } else if (token.roleId == 2) {
      console.log('Student');

      setAuth(prev => ({
        ...prev,
        isAdmin: false,
        isStudent: true,
        userToken: token,
      }));
    }
  }
  const [auth, setAuth] = useState<{
    userToken: any;
    isAdmin: boolean;
    isStudent: boolean;
    isLoading: boolean;
  }>({isAdmin: false, isStudent: false, userToken: null, isLoading: true});
  useEffect(() => {
    const getTokenAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {}
      setAuth(prev => ({...prev, isLoading: false}));
      if (userToken) {
        const token = jwt_decode(userToken!);
        handleToken(token);
      }
    };

    getTokenAsync();
  }, []);
  const authContext = useMemo(
    () => ({
      signIn: async (data: any) => {
        login(data)
          .then((res: any) => {
            try {
              const token = jwt_decode(res);
              console.log(JSON.stringify(token));

              handleToken(token);
              AsyncStorage.setItem('userToken', res)
                .then(() => {})
                .catch(e => console.log(e));
            } catch (e) {
              console.log(e);
            }
          })
          .catch(e => Alert.alert('Invalid User Name or Password'));
      },
      signOut: () => {
        console.log('signOut');

        AsyncStorage.removeItem('userToken');
        setAuth(prev => ({
          ...prev,
          userToken: null,
          isAdmin: false,
          isStudent: false,
        }));
      },
    }),
    [],
  );

  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  if (auth.isLoading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <PaperProvider theme={CombinedDefaultTheme}>
            <NavigationContainer theme={CombinedDefaultTheme}>
              <Stack.Navigator>
                {auth.userToken == null && (
                  <Stack.Screen
                    name="login"
                    component={Login}
                    options={{headerShown: false}}
                  />
                )}
                {auth.isAdmin && (
                  <Stack.Screen
                    name="admin"
                    component={AdminDashboard}
                    options={{headerShown: false}}
                    initialParams={{user: auth.userToken}}
                  />
                )}
                {auth.isStudent && (
                  <Stack.Screen
                    name="student"
                    component={StudentDashboard}
                    options={{headerShown: false}}
                    initialParams={{user: auth.userToken}}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
}
const SplashScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator
      size={'large'}
      animating={true}
      color={MD2Colors.blue500}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
