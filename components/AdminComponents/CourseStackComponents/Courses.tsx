import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CourseModel} from '../../../Models/CourseModel';
import axios from 'axios';
import {
  Card,
  Searchbar,
  Text as PaperText,
  Button as PaperButton,
} from 'react-native-paper';

function Courses() {
  const [courses, setCourses] = useState<CourseModel[]>();
  const [filterdCourses, setfilterdCourses] = useState(courses);
  const [searchQuery, setSearchQuery] = useState('');
  let url = (globalThis as any).url as string;
  useEffect(() => {
    axios
      .get(url + '/Course')
      .then(res => res.data)
      .then(data => setCourses(data))
      .catch(e => console.log(e));
  }, []);

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
              <PaperButton>Cancel</PaperButton>
              <PaperButton>Ok</PaperButton>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
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
});

export default Courses;
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
