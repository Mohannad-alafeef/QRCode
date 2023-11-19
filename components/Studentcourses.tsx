import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Card, List} from 'react-native-paper';

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
import {api} from '../Configs/Connection';

const ResultScreen = ({navigation, route}: any) => {
  const {result} = route.params;
  console.log(result);
  return (
    <View style={styles.container}>
      <FlatList
        data={result}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.Text}>
                STUTAS:<Text style={styles.Text1}>{item.status}</Text>
              </Text>
              <Text style={styles.Text}>
                MARK:<Text style={styles.Text1}>{item.mark}</Text>
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => navigation.navigate('Certification')}
                buttonColor="#6fccf6"
                textColor="white">
                Certification
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

const DetailsScreen = ({navigation, route}: any) => {
  const {course} = route.params;
  return (
    <View style={styles.detailsPage}>
      <Image style={styles.image} source={{uri: course.imagUrl}} />

      <Text style={styles.Text}>
        Course Name:
        <Text style={styles.Text1}>{course.courseName}</Text>
      </Text>

      <Text style={styles.Text}>
        Instructor:
        <Text style={styles.Text1}>{course.instructor}</Text>
      </Text>

      <Text style={styles.Text}>
        Start Date:
        <Text style={styles.Text1}>{course.startDate}</Text>
      </Text>

      <Text style={styles.Text}>
        End Date:
        <Text style={styles.Text1}>{course.endDate}</Text>
      </Text>

      <Text style={styles.Text}>
        Time:
        <Text style={styles.Text1}>{course.time}</Text>
      </Text>

      <Button
        buttonColor="#6fccf6"
        textColor="white"
        style={{alignSelf: 'flex-end', marginRight: 10}}>
        Result
      </Button>
    </View>
  );
};
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StudentCourseStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Course" component={Courses} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Result" component={ResultScreen} />
  </Stack.Navigator>
);
const Courses = ({navigation}: any) => {
  const [data, setData] = useState([]);
  const Get = () => {
    axios.get(api + `/UserAccount/UserCourses/4`).then(resp => {
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
        keyExtractor={item => item.course.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Cover source={{uri: item.course.imagUrl}} />
            <Card.Title title={item.course.courseName} />
            <Card.Content>
              <Card.Actions>
                <Button
                  onPress={() =>
                    navigation.navigate('Details', {course: item.course})
                  }
                  buttonColor="#6fccf6"
                  textColor="white">
                  Details
                </Button>
              </Card.Actions>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

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
    color: '#040404',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  Text1: {
    fontSize: 17,
    color: 'gray',
  },
});

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   card: {
//     marginVertical: 8,
//     width: 350,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   detailsPage: {
//     alignItems: 'flex-start',
//   },
//   image: {
//     width: '100%',
//     height: 200, // Adjust the height as needed
//     borderRadius: 8, // Add border radius for a rounded look
//     marginBottom: 12,
//   },
//   Text: {
//     fontSize: 20,
//     fontWeight: 'bold', // Add bold for emphasis
//     marginBottom: 8,
//   },
//   Text1: {
//     fontSize: 17,
//     color: 'gray', // Adjust color for a subtle look
//   },
// });

export default StudentCourseStack;
