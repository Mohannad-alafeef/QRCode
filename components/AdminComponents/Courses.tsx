import React, {useEffect, useState} from 'react';
import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
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
  const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.my_13}
      />
      <FlatList
        data={filterdCourses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={[styles.my_5, styles.roundLess]}>
            <Card.Content>
              <PaperText style={styles.my_5} variant="titleLarge">
                {item.courseName} - {item.instructor}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                {new Date(item.startDate).toDateString()} -
                {new Date(item.endDate).toDateString()}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                {item.time}
              </PaperText>
            </Card.Content>
            <Card.Cover
              style={[styles.roundLess]}
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
          <TextInput
            mode="outlined"
            style={styles.my_5}
            label="Course Name"
            value={selectedCourse?.courseName}
            onChangeText={text => {
              setSelectedCourse((prev: any) => ({...prev, courseName: text}));
            }}
          />
          <TextInput
            mode="outlined"
            style={styles.my_5}
            label="Instructor"
            value={selectedCourse?.instructor}
            onChangeText={text => {
              setSelectedCourse((prev: any) => ({...prev, instructor: text}));
            }}
          />
          <TextInput
            mode="outlined"
            style={styles.my_5}
            label="Start Date"
            value={new Date(selectedCourse?.startDate!).toLocaleDateString()}
            onChangeText={text => {
              setSelectedCourse((prev: any) => ({...prev, startDate: text}));
            }}
            onPressIn={() => setSelectedDate(selectedCourse?.startDate)}
          />
          <TextInput
            mode="outlined"
            style={styles.my_5}
            label="End Date"
            value={new Date(selectedCourse?.endDate!).toLocaleDateString()}
            onChangeText={text => {
              setSelectedCourse((prev: any) => ({...prev, endDate: text}));
            }}
          />
          <TextInput
            mode="outlined"
            style={styles.my_5}
            label="Time"
            value={selectedCourse?.time}
            onChangeText={text => {
              setSelectedCourse((prev: any) => ({...prev, time: text}));
            }}
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
  );
}

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
});

function filterCourses(
  setfilterdCourses: React.Dispatch<
    React.SetStateAction<CourseModel[] | undefined>
  >,
  courses: CourseModel[],
  searchQuery: string,
) {
  setfilterdCourses(
    courses.filter(v => v.courseName.indexOf(searchQuery) > -1),
  );
}
export default Courses;
