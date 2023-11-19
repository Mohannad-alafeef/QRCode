import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
} from 'react-native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function App({navigation, route}: any): JSX.Element {
  const [PasswordDisable, setFlagPass] = useState(true);

  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [disableLogin, setDis] = useState(true);
  (globalThis as any).url = 'https://a968-212-34-22-177.ngrok-free.app/api';
  let token: any;

 
    const[pass,setPass]=useState('');
    const [email,setEmail]=useState('');
    const [disableLogin,setDis] =useState(true);
    (globalThis as any).url="https://7085-2a01-9700-1590-b00-f434-1871-ac4e-2512.ngrok-free.app/api";
    let token: any;

  useEffect(() => {
    if (email != '' && pass != '') setDis(false);
    else setDis(true);


    LogBox.ignoreLogs(['Reanimated 2']);
    LogBox.ignoreLogs([
      'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes' +
        "exported from 'deprecated-react-native-prop-types'.",
      'NativeBase: the contrast ratio of',
      '[react-native-gesture-handler]' +
        "Seems like you're using an old API with gesture components, check out new Gesture system",
    ]);
  }, [email, pass]);

  const CheckValidation = async () => {
    axios
      .post(
        (globalThis as any).url + '/Auth',
        {
          Email: email,
          Password: pass,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        token = jwt_decode(res.data);
        (globalThis as any).user = token;
        if(email!=''&& pass !='')
        setDis(false);
        else setDis(true);

        LogBox.ignoreLogs(['Reanimated 2']);
        LogBox.ignoreLogs([
            'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes'+
            'exported from \'deprecated-react-native-prop-types\'.',
            'NativeBase: the contrast ratio of',
            "[react-native-gesture-handler]"+
            "Seems like you\'re using an old API with gesture components, check out new Gesture system",
        ]);

    },[email,pass])


  const CheckValidation= async ()=>{
    console.log((globalThis as any).url+'/Auth');
    console.log(email);
    console.log(pass);
    
  
    await axios.post((globalThis as any).url+'/Auth',{
      "Email":email,
      "Password":pass
    },{headers:{
      'Content-Type':'application/json'
    }}).then((res)=>{
 
      token=jwt_decode(res.data);
      (globalThis as any).user=token;

      if(token.roleId == 1){
        console.log(token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'admin' }],
        });
        (globalThis as any).admin=true,
        navigation.navigate('admin');
      }
      else if(token.roleId == 2){
        console.log(token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'student' }],
        });
        (globalThis as any).student=true,
        navigation.navigate('student');
      }
      else{
 
        Alert.alert('username or password is incorrect');
      }
    }).catch((error)=>{
      console.log(error);
      Alert.alert('username or password is incorrect');
    })


   
  }

  return(

        if (token.roleId == 1) {
          console.log(token);
          navigation.reset({
            index: 0,
            routes: [{name: 'admin'}],
          });
          ((globalThis as any).admin = true), navigation.navigate('admin');
        } else if (token.roleId == 2) {
          console.log(token);
          navigation.reset({
            index: 0,
            routes: [{name: 'student'}],
          });
          ((globalThis as any).student = true), navigation.navigate('student');
        } else {
          Alert.alert('username or password is incorrect');
        }
      })
      .catch(error => {
        Alert.alert('username or password is incorrect');
      });
  };


  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../Images/Loginbackground.png')}
        style={styles.backgroundImage}>
        <ScrollView>
          <Image
            source={require('../Images/LoginImage.png')}
            style={styles.loginImage}></Image>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>Welcome</Text>
            <View style={{flexDirection: 'row', marginTop: 30}}>
              <Icon name="envelope-o" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
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
                style={[styles.input]}
                onChangeText={pass => setPass(pass)}
                secureTextEntry={PasswordDisable}
              />
              <TouchableOpacity onPress={() => setFlagPass(!PasswordDisable)}>
                <Icon
                  onPress={() => setFlagPass(!PasswordDisable)}
                  name="eye"
                  size={16}
                  style={{position: 'absolute', right: 10, padding: 10}}
                />
              </TouchableOpacity>
            </View>
            <Button
              style={styles.loginButtom}
              onPress={() => CheckValidation()}
              mode="contained"
              disabled={disableLogin ? true : false}>
              Login
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
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
    backgroundColor: '#abdcfa',
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
