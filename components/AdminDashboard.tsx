import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StudentStack from './AdminComponents/StudentStack';

import Courses from './AdminComponents/Courses';
import AdminProfile from './AdminComponents/AdminProfile';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function AdminDashboard({route}: any): JSX.Element {
  const {user} = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{
          tabBarIcon: props => (
            <Icon name="book" size={20} color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="StudentStack"
        component={StudentStack}
        options={{
          tabBarIcon: props => (
            <Icon name="users" size={20} color={props.color} />
          ),
          title: 'Students',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfile}
        options={{
          tabBarIcon: props => (
            <Icon name="user" size={20} color={props.color} />
          ),
        }}
        initialParams={{user: user}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AdminDashboard;
