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
import StudentProfile from './StudentComponents/StudentProfile';
import StudentCourseStack from './StudentComponents/Studentcourses';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function StudentDashboard({route}: any): JSX.Element {
  const {user} = route.params;
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Courses"
          component={StudentCourseStack}
          initialParams={{user: user}}
          options={{
            tabBarIcon: props => (
              <Icon name="book" size={20} color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={StudentProfile}
          options={{
            tabBarIcon: props => (
              <Icon name="user" size={20} color={props.color} />
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
