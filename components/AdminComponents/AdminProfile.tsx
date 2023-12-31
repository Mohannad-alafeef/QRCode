import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Card, useTheme} from 'react-native-paper';
import axios from 'axios';
import {api} from '../../Configs/Connection';
import {AuthContext} from '../../Configs/AuthContext';
const Stack = createNativeStackNavigator();
const GetUserInfo = async () => {
  axios
    .get(api + '/UserAccount/user/' + (globalThis as any).user.id)
    .then(result => {
      (globalThis as any).user = result.data[0];
      console.log((globalThis as any).user);
    })
    .catch(err => Alert.alert(err.message));
};

function AdminProfile({route}: any) {
  let theme = useTheme();
  const {user} = route.params;
  const {signOut} = useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../../Images/profilebgg.png')}
      style={styles.backgroundImage}>
      <ScrollView>
        <Card style={styles.card}>
          <View style={{alignItems: 'center'}}>
            <Card.Cover
              source={{uri: user.imageUrl}}
              style={styles.imageCard}></Card.Cover>
            <Text
              style={{
                ...styles.name,
                color: theme.colors.onSecondaryContainer,
              }}>
              {user.firstName} {user.lastName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                color={theme.colors.onSurfaceVariant}
                name="location-arrow"
              />
              <Text style={{color: theme.colors.onSurfaceVariant}}>
                {user.address}
              </Text>
            </View>
          </View>
          <Card style={styles.infotable}>
            <View>
              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{color: theme.colors.onSurfaceVariant}}>
                  Email{' '}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    color: theme.colors.onSurfaceVariant,
                  }}>
                  {user.email}
                </Text>
              </View>
              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{color: theme.colors.onSurfaceVariant}}>
                  Phone Number{' '}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    color: theme.colors.onSurfaceVariant,
                  }}>
                  {user.phone}
                </Text>
              </View>
              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{color: theme.colors.onSurfaceVariant}}>
                  Gender{' '}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    color: theme.colors.onSurfaceVariant,
                  }}>
                  {user.gender}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: theme.colors.onSurfaceVariant}}>
                  BirthDate{' '}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    color: theme.colors.onSurfaceVariant,
                  }}>
                  {user.dateOfBirth.split(' ')[0]}
                </Text>
              </View>
            </View>
          </Card>
          <Card.Actions>
            <Button mode="contained" onPress={signOut}>
              <Icon name="power-off" /> log out
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </ImageBackground>
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
});

export default AdminProfile;
