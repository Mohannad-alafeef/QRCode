
import React, { useEffect, useState, useLayoutEffect, useContext, useRef } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Alert,
  useColorScheme,
  ImageBackground,
  View,
  Linking,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Card } from 'react-native-paper';
import axios from 'axios';
import { api } from '../Configs/Connection';
import { AuthContext } from '../Configs/AuthContext';
import {
  NativeViewGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { customeTheme } from '../Configs/CustomeTheme';
const them = customeTheme;

const Stack = createNativeStackNavigator();
const UpdateCv = async (doc: DocumentPickerResponse, id: any) => {
  console.log(doc.fileCopyUri);

  const formData = new FormData();
  formData.append('CV', {
    uri: doc.fileCopyUri,
    name: 'cv.pdf',
    type: 'application/pdf',
  });
  formData.append('Id', id);
  console.log(id);

  await axios
    .put(api + '/UserAccount/UpdateCV', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => (console.log(id), Alert.alert('updated successfully')))
    .catch(err => console.log(err));
};
const selectDoc = async (id: any) => {
  console.log('selectDoc ' + id);

  try {
    const doc = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
      copyTo: 'cachesDirectory',
    });
    UpdateCv(doc, id);
  } catch (err) {
    if (DocumentPicker.isCancel(err))
      console.log('User cancelled the upload', err);
    else console.log(err);
  }
};

const ProfileScreen = ({ navigation, route }: any) => {
  const { user } = route.params;
  const { signOut } = useContext(AuthContext);
const[download,setd]=useState(false)
  return (
    <ImageBackground
      source={require('../Images/profilebg3.png')}
      style={styles.backgroundImage}>
      <ScrollView>
        <Card style={styles.card}>
          <View style={{ alignItems: 'center' }}>
            <Card.Cover
              source={{ uri: user.imageUrl }}
              style={styles.imageCard}></Card.Cover>
            <Text style={styles.name}>
              {user.firstName} {user.lastName}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="location-arrow" />
              <Text>{user.address}</Text>
            </View>
          </View>
          <Card style={styles.infotable}>
            <View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <Text>Email </Text>
                <Text style={{ position: 'absolute', right: 0 }}>
                  {user.email}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <Text>Phone Number </Text>
                <Text style={{ position: 'absolute', right: 0 }}>
                  {user.phone}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <Text>Gender </Text>
                <Text style={{ position: 'absolute', right: 0 }}>
                  {user.gender}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>BirthDate </Text>
                <Text style={{ position: 'absolute', right: 0 }}>
                  {user.dateOfBirth.split(' ')[0]}
                </Text>
              </View>
            </View>
          </Card>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CV', { user: user })}>
              CV{' '}
            </Button>
            
            <Button mode="contained" onPress={signOut}>
              Log out
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
      {/* <View style={{ height: 0 }}>
    {download && <WebView
    onLoadEnd={props=>(setd(!download))}
      source={{
        uri: user.cvUrl,
        
      }}
    />}
  </View> */}
    </ImageBackground>
   
  );
};

const CV = ({ navigation, route }: any) => {
  const { user } = route.params;
  const { download } = route.params;
  const [url, setUrl] = useState(user.cvUrl);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    //console.log(user.id),
    axios.get(api + `/UserAccount/user/${user.id}`).then(resp => {
      setUrl(resp.data[0].cvUrl);
      console.log(url)
      setLoading(true);
      console.log(loading);
    });
  });
 console.log(url)

  return (
<>
        <WebView
          source={{
            uri: `https://docs.google.com/gview?embedded=true&url=${url}`,
          }}
        />
      <View style={{ height: 0 }}>
        {download && <WebView
          source={{
            uri: url,
          }}
        />}
      </View>
      </>
 
  );
};

function StudentProfile({ route, navigation }: any): JSX.Element {
  const { user } = route.params;
  console.log(user.id);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
          initialParams={{ user: user }}
        />
        <Stack.Screen
          name="CV"
          initialParams={{ download: false,user:user }}
          component={CV}
          options={{
            headerStyle: { backgroundColor: them.lightColors.onSecondary },

            headerRight: props => (
              <>
                <Button
                  onPress={() => (
                    selectDoc(user.id), navigation.navigate('profile')
                  )}>
                  <Icon style={{ paddingLeft: 10 }} name="upload" size={20} />
                </Button>
                <Button
                  onPress={() =>
                    navigation.navigate('CV', { download: true, user: user })
                  }>
                  <Icon style={{ paddingLeft: 10 }} name="download" size={20} />
                </Button>
              </>
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: 'white',
    marginTop: 150,
    borderTopStartRadius: 80,
    borderTopEndRadius: 80,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  imageCard: {
    height: 150,
    width: 150,
    borderRadius: 100,
    top: -50,
    borderWidth: 15,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  name: {
    alignContent: 'center',
    fontSize: 18,
    top: -20,
  },
  infotable: {
    backgroundColor: '#f2f7ff',
    padding: 20,
    margin: 20,
  },
  cvButton: {
    backgroundColor: '#abdcfa',
    borderColor: '#abdcfa',
  },
});

export default StudentProfile;
