import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Card,
  Button,
  Text,
  Paragraph,
  Switch,
  Headline,
  IconButton,
  MD3Colors,
  useTheme,
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
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../Configs/AuthContext';

const Stack = createNativeStackNavigator();

function Login({navigation, route}: any): JSX.Element {
  const theme = useTheme();
  const [PasswordDisable, setFlagPass] = useState(true);
  const {signIn} = useContext(AuthContext);

  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [disableLogin, setDis] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email != '' && pass != '') setDis(false);
    else setDis(true);
  }, [email, pass]);

  const CheckValidation = async () => {
    setLoading(true);
    signIn({
      email: email,
      password: pass,
    }).catch((e: any) => {
      setLoading(false);
      Alert.alert('Invalid User Name or Password');
    });
  };

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../../Images/loginbgg.png')}
            style={[styles.backgroundImage]}
          />
          <ScrollView>
            <Image
              source={require('../../Images/LoginImage.png')}
              style={styles.loginImage}></Image>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.text}>Welcome</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                }}>
                <Icon name="envelope-o" size={20} style={styles.inputIcon} />
                <TextInput
                  style={{
                    ...styles.input,
                    color: theme.colors.onSecondaryContainer,
                    paddingStart: 20,
                    paddingEnd: 20,
                  }}
                  placeholderTextColor={theme.colors.secondary}
                  placeholder="Email"
                  onChangeText={e => setEmail(e)}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 40}}>
                <Icon
                  name="lock"
                  size={20}
                  style={[styles.inputIcon, {width: 40, paddingLeft: 13}]}
                />
                <TextInput
                  placeholder="Password"
                  style={{
                    ...styles.input,
                    color: theme.colors.onSecondaryContainer,
                    paddingEnd: 40,
                    paddingStart: 20,
                  }}
                  placeholderTextColor={theme.colors.secondary}
                  onChangeText={pass => setPass(pass)}
                  secureTextEntry={PasswordDisable}
                />
                <TouchableOpacity onPress={() => setFlagPass(!PasswordDisable)}>
                  <Icon
                    onPress={() => setFlagPass(!PasswordDisable)}
                    name="eye"
                    size={16}
                    style={{
                      position: 'absolute',
                      right: 10,
                      padding: 10,
                      color: theme.colors.onSecondaryContainer,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Button
                style={{marginTop: 20}}
                onPress={() => CheckValidation()}
                mode="contained"
                loading={loading}
                disabled={disableLogin ? true : false}>
                Login
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <IconButton
        icon="qrcode-scan"
        iconColor={theme.colors.primary}
        size={25}
        onPress={() => navigation.navigate('QrScanner')}
        style={styles.qrButton}
        mode="contained-tonal"
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  qrButton: {
    position: 'absolute',
    bottom: 20,
    end: 20,
  },
});

export default Login;
