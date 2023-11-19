
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Card, List } from 'react-native-paper';

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';



const HomeScreen = () => {
  return (
    <Text>Home</Text>
  )
}



const ResultScreen = ({ navigation, route }: any) => {
  const { result } = route.params;
  console.log(result);
  return (
    <View style={styles.container}>
      <FlatList
        data={result}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.Text}>STUTAS:<Text style={styles.Text1}>{item.status}</Text></Text>
              <Text style={styles.Text}>MARK:<Text style={styles.Text1}>{item.mark}</Text></Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => navigation.navigate('Certification')}
                buttonColor='#6fccf6'
                textColor='white' >
                Certification</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  )
}


const DetailsScreen = ({ navigation, route }:any) => {
  const [data, setData] = useState([]);
  const [userCourseData, setUserCourseData] = useState([]);
  const [list, setList] = useState([]);
  const getResultData = () => {
    axios
      .get('https://7085-2a01-9700-1590-b00-f434-1871-ac4e-2512.ngrok-free.app/api/UserCourse')
      .then((resp) => {
        const userCourseData = resp.data;
        const list = [];
        for (let i = 0; i < userCourseData.length; ++i) {
          if (userCourseData[i]['course']['id'] == course.id) {
            list.push({
              id: userCourseData[i]['id'],
              status: userCourseData[i]['status'],
              mark: userCourseData[i]['mark'],
            });
          }
        }
        console.log(`list:::: ${list}`);
        navigation.navigate('Result', { result: list });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };



const GetAll = () => {
    axios
      .get('https://7085-2a01-9700-1590-b00-f434-1871-ac4e-2512.ngrok-free.app/api/Course')
      .then((resp) => {
        setData(resp.data);
      });
 };

  useEffect(() => {
    GetAll();
  }, []);
  const { course } = route.params;
  return (
    <View style={styles.detailsPage}>
      <Image
        style={styles.image}
        source={{ uri: course.imagUrl }} />

      <Text style={styles.Text}>Course Name:
        <Text style={styles.Text1}>
          {course.courseName}
        </Text>
      </Text>

      <Text style={styles.Text}>Instructor:
        <Text style={styles.Text1}>
          {course.instructor}
        </Text>
      </Text>

      <Text style={styles.Text}>Start Date:
        <Text style={styles.Text1}>
          {course.startDate}
        </Text>
      </Text>

      <Text style={styles.Text}>End Date:
        <Text style={styles.Text1}>
          {course.endDate}
        </Text>
      </Text>

      <Text style={styles.Text}>Time:
        <Text style={styles.Text1}>
          {course.time}
        </Text>
      </Text>

      <Button onPress={getResultData} buttonColor='#6fccf6' textColor='white' style={{ alignSelf: 'flex-end',marginRight: 10}}>Result</Button>
    </View>
  );
};
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CoursesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Course" component={CoursesScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Result" component={ResultScreen} />


  </Stack.Navigator>
);
const CoursesScreen = ({ navigation }: any) => {


  const [data, setData] = useState([]);
  const Get = () => {
    axios
      .get('https://7085-2a01-9700-1590-b00-f434-1871-ac4e-2512.ngrok-free.app/api/Course')
      .then((resp) => {
        setData(resp.data);
      });
  };

  useEffect(() => {
    Get();
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.imagUrl }} />
            <Card.Title title={item.courseName} />
            <Card.Content>
              <Card.Actions>
                <Button onPress={() =>
                  navigation.navigate('Details', { course: item })}
                  buttonColor='#6fccf6'
                  textColor='white'
                >Details
                </Button>
              </Card.Actions>
            </Card.Content>

          </Card>
        )}
      />
    </View>
  );
};






function App(): JSX.Element {


  return (
    <>

      <Tab.Navigator barStyle={{ backgroundColor: 'white', }} activeColor='#abdcfa'>
        <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: (props) => (<Icon name="home" size={20} color={'#abdcfa'} />) }} />
        <Tab.Screen name='Courses' component={CoursesStack} options={{ tabBarIcon: (props) => (<Icon name="book" size={20} color={'#abdcfa'} />) }} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,

  },
  card: {
    marginVertical: 8,
    width: 350,
    backgroundColor: '#f2f2f2',
  },
  detailsPage: {
    alignItems: 'flex-start',
    
    

  },
  image: {
        width: '100%',
        height: 200, 
        borderRadius: 8, 
        marginBottom: 12,
      },
      Text: {
      fontSize: 20,
      fontWeight: 'bold', 
      color:"#040404",
      marginBottom: 8,
      paddingHorizontal: 16,

    },
  Text1: {
    fontSize: 17,
    color: 'gray',
    
  },




});

export default App;


