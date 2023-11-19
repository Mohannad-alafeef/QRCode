import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StudentProfile from './StudentProfile';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  return <Text>Home</Text>;
};

const CoursesScreen = () => {
  return <Text>courses</Text>;
};

function StudentDashboard({route}: any): JSX.Element {
  const {user} = route.params;
  return (
    <>
      <Tab.Navigator
        barStyle={{backgroundColor: 'white'}}
        activeColor="#abdcfa">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: props => (
              <Icon name="home" size={20} color={'#abdcfa'} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={StudentProfile}
          options={{
            tabBarIcon: props => (
              <Icon name="user" size={20} color={'#abdcfa'} />
            ),
          }}
          initialParams={{user: user}}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});

export default StudentDashboard;
