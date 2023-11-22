import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { UserModel } from '../../../Models/UserModel';
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
import { api } from '../../../Configs/Connection';
function Students({ navigation }: any) {
  const [students, setStudents] = useState<UserModel[]>();
  useEffect(() => {
    axios
      .get(api + '/UserAccount/2')
      .then(res => res.data)
      .then(data => setStudents(data))
      .catch(e => console.log(e));
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../Images/coursesbg3.png')}
        style={[styles.backgroundImage]}>
      </ImageBackground>
      <View style={styles.Hearder}>
        <Image source={{ uri: 'https://www.l4it.systems/wp-content/uploads/2022/07/E-learning-platform.png' }} width={150} height={25} style={{ marginLeft: 10 }} />
      </View>
      <View>

        <FlatList
          data={students}
          keyExtractor={Item => Item.id.toString()}
          renderItem={({ item }) => (
            <Card style={[styles.my_13, styles.mx_13, styles.roundLess]}>
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
                    source={{ uri: item.imagUrl, width: 70, height: 70 }}
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
  mx_13: {
    marginStart: 13,
    marginEnd: 13,
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
  Hearder: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff',
    //width: 300,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
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
export default Students;
