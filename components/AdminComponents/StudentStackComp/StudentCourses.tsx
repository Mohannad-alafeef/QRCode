import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {CourseModel} from '../../../Models/CourseModel';
import QRCode from 'react-native-qrcode-svg';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {
  Card,
  Searchbar,
  Text as PaperText,
  Button as PaperButton,
  Portal,
  TextInput,
  Modal,
} from 'react-native-paper';
import axios from 'axios';
import {UserCourse} from '../../../Models/UserCourseModel';
import {CourseStatus} from '../../../Models/CourseStatus';
import {IndexPath, Layout, Select, SelectItem} from '@ui-kitten/components';
import {Alert} from 'react-native';
import {pdfTemplate} from '../../../Configs/pdfTemplate';
import {generatePDF} from '../../../Services/UserCourseService';

function StudentCourses({route, navigation}: any) {
  const {firstName, lastName, studentId, imageUrl} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${firstName} ${lastName} Courses`,
    });
  });
  //usf var
  let url = (globalThis as any).url as string;
  const [userCourses, setUserCourses] = useState<UserCourse[]>();
  const [filterdCourses, setfilterdCourses] = useState(userCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserCourse, setSelectedUserCourse] = useState<UserCourse>();
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userCourseStatus, setUserCourseStatus] = useState<CourseStatus>();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );
  const stage1 = 'generating pdf file';
  const [certifyStage, setCertifyStage] = useState<string>(stage1);
  const [certifyModal, setCertifyModal] = useState<boolean>(false);
  const [pdfData, setPdfData] = useState<UserCourse>();
  const [pdfOptions, setPdfOptions] = useState<{
    html: string;
    fileName: string;
    directory: string;
  }>({
    html: '',
    fileName: `invoice`,
    directory: 'Invoices',
  });

  const displayValue = Object.keys(CourseStatus).filter(
    (v, _i) => isNaN(Number(v)) && v !== 'Certified',
  )[selectedIndex.row];
  const showModal = (item: UserCourse) => {
    setSelectedIndex(new IndexPath(CourseStatus[item.status]));
    setSelectedUserCourse(item);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  useEffect(() => {
    axios
      .get(url + `/UserCourse/ByUserId/${studentId}`)
      .then(res => res.data)
      .then(data => setUserCourses(data))
      .catch(e => console.log(e));
  }, [refresh]);
  useEffect(() => {
    if (userCourses) {
      setfilterdCourses(userCourses);
    }
  }, [userCourses]);
  const [qrCode, setQrCode] = useState<any>();

  useEffect(() => {
    if (qrCode) {
      qrCode.toDataURL((data: any) => {
        setPdfOptions(prev => ({...prev, html: pdfTemplate(data)}));

        console.log('qr ' + JSON.stringify(pdfOptions));
      });
    }
  }, [pdfData]);
  //   useEffect(() => {
  //     if (searchQuery && courses) {
  //       filterCourses(setfilterdCourses, courses, searchQuery);
  //     } else {
  //       setfilterdCourses(courses);
  //     }
  //   }, [searchQuery]);
  return (
    <View style={styles.container}>
      {true && (
        <QRCode
          getRef={c => setQrCode(c)}
          value={userCourses ? userCourses![0].course.imagUrl : 'wadawd'}
          logo={{}}
        />
      )}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.my_13}
      />
      <FlatList
        data={userCourses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={[styles.my_5, styles.roundLess]}>
            <Card.Content>
              <PaperText style={styles.my_5} variant="titleLarge">
                {item.course.courseName} - {item.course.instructor}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                {new Date(item.course.startDate).toDateString()} -
                {new Date(item.course.endDate).toDateString()}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                {item.course.time}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                Status : {item.status}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                Student Mark : {item.mark}
              </PaperText>
            </Card.Content>
            <Card.Cover
              style={[styles.roundLess]}
              source={{uri: item.course.imagUrl}}
            />
            <Card.Actions>
              {item.status != CourseStatus[3] && (
                <>
                  <PaperButton onPress={() => showModal(item)} mode="contained">
                    Update
                  </PaperButton>
                  {item.status == CourseStatus[1] && (
                    <PaperButton
                      onPress={() =>
                        Alert.alert(
                          'Generate Certification ?',
                          `Do you want to certify ${firstName} ${lastName} for the course ${item.course.courseName} ?`,
                          [
                            {
                              text: 'No',
                            },
                            {
                              text: 'Yes',
                              isPreferred: true,
                              onPress: () => {
                                setCertifyStage(stage1);
                                setCertifyModal(true);
                                setPdfData(item);
                                generatePDF(pdfOptions).then(pdf => {
                                  setCertifyModal(false);
                                });
                              },
                            },
                          ],
                          {
                            cancelable: true,
                          },
                        )
                      }
                      mode="contained">
                      Certify
                    </PaperButton>
                  )}
                </>
              )}
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
            label="End Date"
            value={selectedUserCourse?.mark.toString()}
            onChangeText={text => {
              setSelectedUserCourse((prev: any) => ({...prev, mark: text}));
            }}
          />
          <Select
            selectedIndex={selectedIndex}
            style={styles.my_5}
            value={displayValue}
            onSelect={index => {
              setSelectedIndex(index);
              setSelectedUserCourse((prev: any) => ({
                ...prev,
                status: CourseStatus[index.row],
              }));
            }}>
            {Object.keys(CourseStatus)
              .filter((v, _i) => isNaN(Number(v)) && v !== 'Certified')
              .map(renderOption)}
          </Select>

          <Button
            title="save"
            onPress={() => {
              update(selectedUserCourse)
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
      <Modal visible={certifyModal} onDismiss={() => setCertifyModal(false)}>
        <Card style={[styles.roundLess, styles.p_7, styles.m_5]}>
          <Card.Content>
            <Text>{certifyStage}</Text>
          </Card.Content>
        </Card>
      </Modal>
    </View>
  );
}
const renderOption = (title: string, i: number): React.ReactElement => (
  <SelectItem key={i.toString()} title={title} />
);
const update = async (item: any): Promise<any> => {
  return await axios.put((globalThis as any).url + '/UserCourse/Update', item, {
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
  qrDialog: {
    justifyContent: 'center',
  },
  p_7: {
    padding: 7,
  },
  m_5: {
    margin: 5,
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

export default StudentCourses;
