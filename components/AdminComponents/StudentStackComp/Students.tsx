import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {UserModel} from '../../../Models/UserModel';
import {
  Card,
  Searchbar,
  Text as PaperText,
  Button as PaperButton,
  Portal,
  TextInput,
  Modal,
  TouchableRipple,
} from 'react-native-paper';
function Students({navigation}: any) {
  let url = (globalThis as any).url as string;
  const [students, setStudents] = useState<UserModel[]>();
  useEffect(() => {
    axios
      .get(url + '/UserAccount/2')
      .then(res => res.data)
      .then(data => setStudents(data))
      .catch(e => console.log(e));
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={Item => Item.id.toString()}
        renderItem={({item}) => (
          <Card style={[styles.my_5, styles.mx_5, styles.roundLess]}>
            <TouchableRipple
              onPress={() =>
                navigation.navigate('StudentCourses', {
                  firstName: item.firstName,
                  lastName: item.lastName,
                  imageUrl: item.imagUrl,
                  studentId: item.id,
                })
              }
              rippleColor="rgba(0, 0, 0, .32)"
              style={[styles.p_5]}>
              <Card.Content style={[styles.containerRow]}>
                <Image
                  style={styles.userImg}
                  source={{uri: item.imagUrl, width: 70, height: 70}}
                />
                <PaperText style={styles.userName} variant="titleMedium">
                  {item.firstName} {item.lastName}
                </PaperText>
              </Card.Content>
            </TouchableRipple>
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
  containerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  my_13: {
    marginBottom: 13,
    marginTop: 13,
  },
  my_5: {
    marginBottom: 5,
    marginTop: 5,
  },
  mx_5: {
    marginStart: 5,
    marginEnd: 5,
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
  p_5: {
    padding: 5,
  },
  userName: {
    verticalAlign: 'middle',
    paddingStart: 10,
  },
  userImg: {
    borderRadius: 50,
  },
});
export default Students;
