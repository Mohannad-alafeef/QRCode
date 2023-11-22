import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Card,
  Button,
  Text,
  Paragraph,
  Switch,
  Headline,
} from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  LogBox,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../Configs/AuthContext';

const Stack = createNativeStackNavigator();

function App({ navigation, route }: any): JSX.Element {
  const [PasswordDisable, setFlagPass] = useState(true);
  const { signIn } = useContext(AuthContext);

  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [disableLogin, setDis] = useState(true);

  useEffect(() => {
    if (email != '' && pass != '') setDis(false);
    else setDis(true);
  }, [email, pass]);

  const CheckValidation = async () => {
    signIn({
      email: email,
      password: pass,
    });
  };

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          source={require('../Images/loginbgg.png')}
          style={[styles.backgroundImage]}>
        </ImageBackground>
        <ScrollView style={{ marginHorizontal: 15 }}>
          <Image
            source={require('../Images/LoginImage.png')}
            style={styles.loginImage}></Image>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>Welcome</Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <Icon name="envelope-o" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={e => setEmail(e)}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 40 }}>
              <Icon
                name="lock"
                size={20}
                style={[styles.inputIcon, { width: 40, paddingLeft: 13 }]}
              />
              <TextInput
                placeholder="Password"
                style={[styles.input]}
                onChangeText={pass => setPass(pass)}
                secureTextEntry={PasswordDisable}
              />
              <TouchableOpacity onPress={() => setFlagPass(!PasswordDisable)}>
                <Icon
                  onPress={() => setFlagPass(!PasswordDisable)}
                  name="eye"
                  size={16}
                  style={{ position: 'absolute', right: 10, padding: 10 }}
                />
              </TouchableOpacity>
            </View>
            <Button
              style={{ marginTop: 20 }}
              onPress={() => CheckValidation()}
              mode="contained"
              disabled={disableLogin ? true : false}>
              Login
            </Button>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    //width:'100%',
    //height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loginImage: {
    width: 300,
    height: 300,
    margin: 50,
  },

  input: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#abdcfa',
    width: 300,
    height: 40,
    paddingLeft: 10,
    marginLeft: 15,
  },
  text: {
    fontSize: 20,
    color: '#00729b',
    fontFamily: '',
    marginTop: -90,
  },
  inputIcon: {
    //paddingTop:10,
    paddingRight: 10,
    //backgroundColor: '#abdcfa',
    //backgroundColor:'#3F85AF',
    backgroundColor: '#23678F',
    color: 'white',
    alignItems: 'center',
    borderRadius: 40,
    padding: 10,
  },

  loginButtom: {
    backgroundColor: '#abdcfa',

    width: 200,
    marginTop: 40,
  },
});

export default App;
