import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import Courses from './CourseStackComponents/Courses';

let Stack = createNativeStackNavigator();

function CourseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Courses"
        component={Courses}
      />
    </Stack.Navigator>
  );
}

export default CourseStack;
