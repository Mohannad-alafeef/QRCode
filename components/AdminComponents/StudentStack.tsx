import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import Students from './StudentStackComp/Students';
import StudentCourses from './StudentStackComp/StudentCourses';

const Stack = createNativeStackNavigator();

function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Students"
        component={Students}
      />
      <Stack.Screen
        //  options={{title:'',headerBackButtonMenuEnabled}}
        name="StudentCourses"
        component={StudentCourses}
      />
    </Stack.Navigator>
  );
}

export default StudentStack;
