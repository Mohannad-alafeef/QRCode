
import React,{useEffect, useState,useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from  'react-native-vector-icons/FontAwesome';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,Alert,
  useColorScheme,ImageBackground,
  View, Linking
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button,Card } from 'react-native-paper';
import axios from 'axios';

const Stack =createNativeStackNavigator();

const GetUserInfo  =async() =>{
  axios.get((globalThis as any).url+'/UserAccount/user/'+(globalThis as any).user.id)
  .then(result => {
      (globalThis as any).user = result.data[0];
      console.log((globalThis as any).user);
  })
  .catch((err)=>Alert.alert(err.message))
  
}
const ProfileScreen =({navigation,route}:any)=>{
  const [userInfo,setUser]=useState((globalThis as any).user);


  useEffect(()=>{
    axios.get((globalThis as any).url+'/UserAccount/user/'+(globalThis as any).user.id)
  .then(result => {
      (globalThis as any).user = result.data[0];
      setUser(result.data[0])
      //console.log((globalThis as any).user);
  })
  .catch((err)=>Alert.alert(err.message))
  },[])

 
   return(
       <ImageBackground source={require('../Images/profileBg.png')} style={styles.backgroundImage}>
       <ScrollView>
               <Card style={styles.card}>
                   <View style={{alignItems:'center'}}>
                   <Card.Cover source={{uri:userInfo.imagUrl}} style={styles.imageCard}></Card.Cover>
                   <Text style={styles.name}>{userInfo.firstName} {userInfo.lastName}</Text>
                   <View style={{flexDirection:'row'}}>
                   <Icon name='location-arrow'/>
                   <Text>{userInfo.address}</Text>
                   </View>
                   </View>
                   <Card style={styles.infotable}>
                       <View >
                           <View style={{flexDirection:'row',paddingBottom:10}}>
                          <Text>Email </Text>
                          <Text style={{position:'absolute',right:0 }}>{userInfo.email}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingBottom:10}}>
                          <Text>Phone Number  </Text>
                          <Text style={{position:'absolute',right:0 }}>{userInfo.phone}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingBottom:10}}>
                          <Text>Gender </Text>
                          <Text style={{position:'absolute',right:0 }}>{userInfo.gender}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                          <Text>BirthDate </Text>
                          <Text style={{position:'absolute',right:0 }}>{userInfo.dateOfBirth.split('T',1)}</Text>
                          </View>
                       </View>
                   </Card>

                 
               </Card>
           </ScrollView>
 
     
       </ImageBackground>
   )
 }



function App({navigation}:any): JSX.Element {
 
  useEffect(()=>{
    GetUserInfo
  },[])

  return (
  <>
    <Stack.Navigator >
        <Stack.Screen name='profile'component={ProfileScreen}  options={{headerShown:false}}/>
    </Stack.Navigator> 
  </>
  );
}

const styles = StyleSheet.create({
    backgroundImage:{
        width:'100%',
        height:'100%',

    },
   
    card:{
        backgroundColor:'white',
        marginTop:150,
       borderTopStartRadius:80,
       borderTopEndRadius:80,
     
    },
    imageCard:{
        height:150,
        width:150,
        borderRadius:100,
        top:-50,
        borderWidth:15,
        borderColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,

    },
    name:{
        alignContent:'center',
        fontSize:18,
        top:-20,

    },
    infotable:{
        backgroundColor:'#f2f7ff',
        padding:20,
        margin:20,

    },
    
});

export default App;
