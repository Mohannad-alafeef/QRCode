import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {CourseModel} from '../../Models/CourseModel';
import axios from 'axios';
import {
  Card,
  Searchbar,
  Text as PaperText,
  Button as PaperButton,
  Portal,
  TextInput,
  Modal,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {api} from '../../Configs/Connection';
import {Datepicker, Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function Courses() {
  const [courses, setCourses] = useState<CourseModel[]>();
  const [filterdCourses, setfilterdCourses] = useState(courses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseModel>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const showModal = (item: any) => {
    setSelectedCourse(item);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  useEffect(() => {
    axios
      .get(api + '/Course')
      .then(res => res.data)
      .then(data => setCourses(data))
      .catch(e => console.log(e));
  }, [refresh]);

  useEffect(() => {
    if (courses) {
      setfilterdCourses(courses);
    }
  }, [courses]);
  useEffect(() => {
    if (searchQuery && courses) {
      filterCourses(setfilterdCourses, courses, searchQuery);
    } else {
      setfilterdCourses(courses);
    }
  }, [searchQuery]);
  useEffect(() => {
    if (filterdCourses) {
      console.log(filterdCourses);
    }
  }, [filterdCourses]);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Images/coursesbg3.png')}
        style={[styles.backgroundImage]}></ImageBackground>
      <View style={styles.coursesHearder}>
        <Image
          source={{
            uri: 'https://www.l4it.systems/wp-content/uploads/2022/07/E-learning-platform.png',
          }}
          width={150}
          height={25}
          style={{marginLeft: 10}}
        />
        <Searchbar
          placeholder="Search Course"
          inputStyle={{paddingBottom: 23}}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[
            styles.my_13,
            {width: 200, height: 40, position: 'relative', left: 20},
          ]}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={filterdCourses}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Card style={[styles.detailscard]}>
              <Card.Content>
                <PaperText
                  style={[styles.my_5, {fontWeight: 'bold'}]}
                  variant="titleLarge">
                  {item.courseName} - {item.instructor}
                </PaperText>
                <PaperText style={styles.my_5} variant="titleMedium">
                  {new Date(item.startDate).toLocaleDateString()} -
                  {new Date(item.endDate).toLocaleDateString()}
                </PaperText>
                <PaperText style={styles.my_5} variant="titleMedium">
                  {item.time}
                </PaperText>
              </Card.Content>
              <Card.Cover
                style={[styles.roundLess, {height: 150}]}
                source={{uri: item.imagUrl}}
              />
              <Card.Actions>
                <PaperButton
                  mode="contained"
                  onPress={() => {
                    showModal(item);
                  }}>
                  Update
                </PaperButton>
              </Card.Actions>
            </Card>
          )}
        />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <Input
              label={'Course Name'}
              placeholder="Place your Text"
              value={selectedCourse?.courseName}
              onChangeText={text =>
                setSelectedCourse((prev: any) => ({...prev, courseName: text}))
              }
              status="primary"
            />
            <Input
              label={'Instructor'}
              placeholder="Place your Text"
              value={selectedCourse?.instructor}
              onChangeText={text =>
                setSelectedCourse((prev: any) => ({...prev, instructor: text}))
              }
              status="primary"
            />

            <Datepicker
              label="Start Date"
              placeholder="Pick Date"
              date={new Date(selectedCourse?.startDate!)}
              onSelect={nextDate =>
                setSelectedCourse((prev: any) => ({
                  ...prev,
                  startDate: measureDate(nextDate),
                }))
              }
              accessoryRight={props => <Icon name="calendar" size={20} />}
              status="primary"
            />
            <Datepicker
              label="End Date"
              placeholder="Pick Date"
              date={new Date(selectedCourse?.endDate!)}
              onSelect={nextDate => {
                console.log(measureDate(nextDate));

                setSelectedCourse((prev: any) => ({
                  ...prev,
                  endDate: measureDate(nextDate),
                }));
              }}
              accessoryRight={props => <Icon name="calendar" size={20} />}
              status="primary"
            />
            <Input
              label={'Course Time'}
              placeholder="Place your Text"
              value={selectedCourse?.time}
              onChangeText={text =>
                setSelectedCourse((prev: any) => ({...prev, time: text}))
              }
              status="primary"
              style={styles.my_5}
            />

            <Button
              title="save"
              onPress={() => {
                update(selectedCourse)
                  .then(r => {
                    console.log(r);

                    setRefresh(!refresh);
                    hideModal();
                  })
                  .catch(e => {
                    console.log(e);

                    hideModal();
                  });
              }}
            />
          </Modal>
        </Portal>
      </View>
    </View>
  );
}
const measureDate = (date: Date) => {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();
};

const update = async (item: any): Promise<any> => {
  return await axios.put(api + '/Course/Update', item, {
    headers: {'Content-Type': 'application/json'},
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  my_13: {
    marginBottom: 13,
    marginTop: 13,
  },
  my_5: {
    marginBottom: 5,
    marginTop: 5,
  },
  roundLess: {
    borderRadius: 0,
  },
  containerStyle: {
    backgroundColor: 'white',
    margin: 15,
    padding: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  picker: {
    borderColor: 'black',
  },
  detailscard: {
    padding: 10,
    margin: 20,
  },
  coursesHearder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    //width: 300,
    //height: 60,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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

function filterCourses(
  setfilterdCourses: React.Dispatch<
    React.SetStateAction<CourseModel[] | undefined>
  >,
  courses: CourseModel[],
  searchQuery: string,
) {
  setfilterdCourses(
    courses.filter(
      v => v.courseName.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1,
    ),
  );
}

export default Courses;
