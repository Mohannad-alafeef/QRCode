import React, {useEffect, useState, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Card, List} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {AuthContext} from '../../Configs/AuthContext';

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
  ImageBackground,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {api} from '../../Configs/Connection';
import {customeTheme} from '../../Configs/CustomeTheme';
const them = customeTheme;
const ResultScreen = ({navigation, route}: any) => {
  const {result} = route.params;

  return (
    <View>
      <Card style={{margin: 20}}>
        <Card.Content>
          <Text style={styles.Text}>
            STUTAS:<Text style={styles.Text1}>{result.status}</Text>
          </Text>
          <Text style={styles.Text}>
            MARK:<Text style={styles.Text1}>{result.mark}</Text>
          </Text>
        </Card.Content>
        <Card.Actions>
          {result.status == 'Certified' && (
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate('Certification', {result: result})
              }>
              Certification
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
};

const DetailsScreen = ({navigation, route}: any) => {
  const {course} = route.params;
  const {result} = route.params;
  const [showResult, Setshow] = useState(false);

  console.log(result);
  return (
    <View>
      <ImageBackground
        source={require('../../Images/coursesbg3.png')}
        style={[styles.backgroundImage]}></ImageBackground>
      <ScrollView>
        <Card style={styles.detailscard}>
          <View style={styles.detailsPage}>
            <Image style={styles.image} source={{uri: course.imagUrl}} />

            <Text style={styles.Text}>
              Course Name:
              <Text style={styles.Text1}>
                {'   '}
                {course.courseName}
              </Text>
            </Text>

            <Text style={styles.Text}>
              Instructor:
              <Text style={styles.Text1}>
                {'   '}
                {course.instructor}
              </Text>
            </Text>

            <Text style={styles.Text}>
              Date:
              <Text style={styles.Text1}>
                {' '}
                {'   '}
                {new Date(course.startDate).toDateString()} -
                {new Date(course.endDate).toDateString()}
              </Text>
            </Text>

            <Text style={styles.Text}>
              Time:
              <Text style={styles.Text1}>
                {'   '}
                {course.time}
              </Text>
            </Text>

            <Button
              onPress={() => Setshow(!showResult)}
              mode="contained"
              style={{alignSelf: 'flex-end', marginRight: 10}}>
              Result
            </Button>
          </View>
        </Card>
        {showResult && (
          <View style={styles.container}>
            <Card style={styles.resultCard}>
              <View style={{flexDirection: 'row', padding: 20}}>
                <Card.Content>
                  <Text style={styles.Text}>
                    Status:
                    <Text style={styles.Text1}>
                      {'   '}
                      {result.status}
                    </Text>
                  </Text>
                  {(result.status == 'Passed' ||
                    result.status == 'Certified') && (
                    <Text style={styles.Text}>
                      MARK:
                      <Text style={styles.Text1}>
                        {'   '}
                        {result.mark}
                      </Text>
                    </Text>
                  )}
                </Card.Content>
                <Card.Actions>
                  {result.status == 'Certified' && (
                    <>
                      <Button
                        mode="contained"
                        onPress={() =>
                          navigation.navigate('Certification', {result: result})
                        }>
                        Certification
                      </Button>
                    </>
                  )}
                  {result.status == 'Passed' && (
                    <Text>Your certificate is{'\n     '} in progress</Text>
                  )}
                </Card.Actions>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const Certification = ({navigation, route}: any) => {
  //const {user} = route.params;
  const {download} = route.params;
  const {result} = route.params;
  const [url, setUrl] = useState();
  const [loading, setloading] = useState('false');

  useEffect(() => {
    get();
  }, []);
  const get = () => {
    axios.get(api + `/Certification/ByUserCourseId/${result.id}`).then(resp => {
      setUrl(resp.data.certificatonUrl);
      setloading('true');
      console.log(resp.data.certificatonUrl);
    });
  };
  return (
    <>
      <WebView
        style={{width: '100%', height: '100%'}}
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${url}`,
        }}
      />
      <View style={{height: 0}}>
        {download && (
          <WebView
            source={{
              uri: url,
            }}
          />
        )}
      </View>
    </>
  );
};
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StudentCourseStack({route, navigation}: any): JSX.Element {
  const {user} = route.params;
  const {signOut} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Course"
        component={CoursesScreen}
        initialParams={{user: user}}
        options={{
          headerStyle: {backgroundColor: them.lightColors.onPrimary},
          headerTitleAlign: 'center',

          headerTitle: props => (
            <View style={{width: 150, height: 20}}>
              <Image
                source={{
                  uri: 'https://www.l4it.systems/wp-content/uploads/2022/07/E-learning-platform.png',
                }}
                width={150}
                height={25}></Image>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{user: user}}
        options={{
          // title: 'Course Details',
          headerStyle: {backgroundColor: them.lightColors.onSecondary},
          headerTitleAlign: 'center',
          headerTitle: props => (
            <View>
              <Image
                source={{
                  uri: 'https://www.l4it.systems/wp-content/uploads/2022/07/E-learning-platform.png',
                }}
                width={150}
                height={25}></Image>
            </View>
          ),
        }}
      />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen
        name="Certification"
        component={Certification}
        initialParams={{download: false}}
        options={{
          headerStyle: {backgroundColor: them.lightColors.onSecondary},
          headerRight: props => (
            <>
              <Icon
                onPress={() =>
                  navigation.navigate('Certification', {download: true})
                }
                style={{paddingLeft: 10}}
                name="download"
                size={20}
              />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
const CoursesScreen = ({navigation, route}: any) => {
  const [data, setData] = useState([]);
  const {user} = route.params;
  const Get = () => {
    axios.get(api + `/UserAccount/UserCourses/${user.id}`).then(resp => {
      setData(resp.data);
    });
  };

  useEffect(() => {
    Get();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Images/coursesbg4.png')}
        style={[styles.backgroundImage]}></ImageBackground>
      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={(item: any) => item.course.id.toString()}
        renderItem={({item}: any) => (
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate('Details', {
                course: item.course,
                result: item,
              })
            }>
            <Card.Cover
              source={{uri: item.course.imagUrl}}
              style={styles.cardImage}
            />
            <Card.Title title={item.course.courseName} />
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 10,
    width: '40%',
    height: '80%',
    padding: 25,
    marginHorizontal: 15,
  },
  cardImage: {
    height: 90,
  },
  detailsPage: {
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  Text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#040404',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  Text1: {
    fontSize: 15,
    color: 'gray',
  },
  detailscard: {
    padding: 20,
    margin: 20,
  },
  resultCard: {
    margin: 30,
    marginTop: 0,
  },
  backgroundImage: {
    //width:'100%',
    //height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
