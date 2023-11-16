import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CourseStack from './AdminComponents/CourseStack';
import StudentStack from './AdminComponents/StudentStack';
import AdminProfile from './AdminComponents/AdminProfile';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function App(): JSX.Element {
  return (
    <>
      <Tab.Navigator
        barStyle={{backgroundColor: 'white'}}
        activeColor="#abdcfa">
        <Tab.Screen
          name="CoursesStack"
          component={CourseStack}
          options={{
            tabBarIcon: props => (
              <Icon name="book" size={20} color={'#abdcfa'} />
            ),
            title: 'Courses',
          }}
        />
        <Tab.Screen
          name="StudentStack"
          component={StudentStack}
          options={{
            tabBarIcon: props => (
              <Icon name="users" size={20} color={'#abdcfa'} />
            ),
            title: 'Students',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={AdminProfile}
          options={{
            tabBarIcon: props => (
              <Icon name="user" size={20} color={'#abdcfa'} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
