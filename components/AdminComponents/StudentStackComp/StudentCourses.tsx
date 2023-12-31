import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import {CourseModel} from '../../../Models/CourseModel';
import QRCode from 'react-native-qrcode-svg';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Buffer} from 'buffer';

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
import {
  Datepicker,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Toggle,
} from '@ui-kitten/components';
import {Alert} from 'react-native';
import {pdfTemplate} from '../../../Configs/pdfTemplate';
import {generatePDF} from '../../../Services/UserCourseService';
import RNFS from 'react-native-fs';

import {angularIp, api} from '../../../Configs/Connection';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

function StudentCourses({route, navigation}: any) {
  const {firstName, lastName, studentId, imageUrl} = route.params;
  const now = new Date();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${firstName} ${lastName} Courses`,
    });
  });
  //usf var
  const [userCourses, setUserCourses] = useState<UserCourse[]>();
  const [filterdCourses, setfilterdCourses] = useState(userCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserCourse, setSelectedUserCourse] = useState<
    UserCourse | undefined
  >();
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );
  const stage1 = 'Generating pdf file...';
  const stage2 = 'Uploading the file...';
  const [certifyStage, setCertifyStage] = useState<string>(stage1);
  const [certifyModal, setCertifyModal] = useState<boolean>(false);
  const [expDateModal, setExpDateModal] = useState<boolean>(false);
  const [pdfData, setPdfData] = useState<UserCourse | undefined>();
  const [pdfBackground, setPdfBackground] = useState<string>();
  const [harmonyLogo, setHarmonyLogo] = useState<string>();
  const [thalufLogo, setThalufLogo] = useState<string>();
  const [lhubLogo, setLhubLogo] = useState<string>();
  const [scanMeLogo, setScanMeLogo] = useState<string>();
  const [lifeTime, setLifeTime] = useState<boolean>(false);
  const [expDate, setExpDate] = useState<string>(new Date().toDateString());
  const [token, setToken] = useState<string>();
  const _pdfOptions = {
    html: '',
    fileName: `invoice`,
    directory: 'Invoices',
    height: 900,
    width: 1270,
  };
  const [pdfOptions, setPdfOptions] = useState<
    | {
        html: string;
        fileName: string;
        directory: string;
        height: number;
        width: number;
      }
    | undefined
  >(_pdfOptions);

  RNFS.readFileAssets('CertificationBackground.png', 'base64').then(r =>
    setPdfBackground(r),
  );
  RNFS.readFileAssets('harmony_logo.jpeg', 'base64').then(r =>
    setHarmonyLogo(r),
  );
  RNFS.readFileAssets('tahalufuae_logo.jpeg', 'base64').then(r =>
    setThalufLogo(r),
  );
  RNFS.readFileAssets('E-learning-platform.png', 'base64').then(r =>
    setLhubLogo(r),
  );
  RNFS.readFileAssets('ScanMe.png', 'base64').then(r => setScanMeLogo(r));

  const displayValue = Object.keys(CourseStatus).filter(
    (v, _i) => v !== CourseStatus.Certified,
  )[selectedIndex.row];
  const showModal = (item: UserCourse) => {
    setSelectedIndex(
      new IndexPath(Object.keys(CourseStatus).indexOf(item.status)),
    );
    setSelectedUserCourse(item);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  useEffect(() => {
    axios
      .get(api + `/UserCourse/ByUserId/${studentId}`)
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
    if (pdfData) {
      setToken(
        generateToken(
          pdfData!.userAccountId,
          firstName,
          now.toISOString(),
          lifeTime ? undefined : expDate!,
        ),
      );
    }
  }, [lifeTime]);

  useEffect(() => {
    console.log(`pdf data :${pdfData != undefined}`);
    console.log(`qr : ${qrCode != undefined}`);
    if (!token && pdfData) {
      setToken(
        generateToken(
          pdfData!.userAccountId,
          firstName,
          now.toISOString(),
          lifeTime ? undefined : expDate!,
        ),
      );
    }

    if (qrCode != undefined && pdfData != undefined) {
      console.log('generate');

      qrCode.toDataURL((data: any) => {
        setPdfOptions({
          ..._pdfOptions,
          html: pdfTemplate(
            data,
            pdfBackground!,
            thalufLogo,
            harmonyLogo,
            pdfData!.course.courseName!,
            pdfData!.course.startDate!,
            pdfData!.course.endDate!,
            firstName,
            lastName,
            lhubLogo,
            scanMeLogo,
            lifeTime ? undefined : expDate,
          ),
        });
      });
    }
  }, [pdfData, qrCode]);
  useEffect(() => {
    if (pdfData != undefined && pdfOptions != undefined) {
      generatePDF(pdfOptions).then(pdf => {
        setCertifyStage(stage2);
        const fData = new FormData();
        fData.append('userCourseId', pdfData!.id.toString());
        fData.append('dateOfIssuance', new Date().toDateString());
        fData.append('expDate', new Date().toDateString());

        fData.append('token', token);
        fData.append('image', {
          uri: 'file://' + pdf.filePath,
          name: 'Certify.pdf',
          type: 'application/pdf',
        });
        axios
          .post(api + `/Certification`, fData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(v => {
            update({
              ...pdfData!,
              status: CourseStatus.Certified,
            })
              .then(r => {
                setRefresh(!refresh);
                setCertifyModal(false);
                setToken(undefined);
              })
              .catch(e => {
                console.log(e);
                setCertifyModal(false);
                setToken(undefined);
              });
          })
          .catch(e => console.log('s2 ' + e));
      });
    }
  }, [pdfOptions]);

  useEffect(() => {}, [certifyModal]);
  useEffect(() => {
    if (searchQuery && userCourses) {
      filterCourses(setfilterdCourses, userCourses, searchQuery);
    } else {
      setfilterdCourses(userCourses);
    }
  }, [searchQuery]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../Images/coursesbg3.png')}
        style={[styles.backgroundImage]}></ImageBackground>
      <Searchbar
        placeholder="Search Course"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={[styles.my_13, {width: 200, position: 'relative', left: 100}]}
      />
      <FlatList
        data={filterdCourses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.detailscard}>
            <Card.Content>
              <PaperText
                style={[styles.my_5, {fontWeight: 'bold'}]}
                variant="titleLarge">
                {item.course.courseName} - {item.course.instructor}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                {new Date(item.course.startDate).toDateString()} -
                {new Date(item.course.endDate).toDateString()}
              </PaperText>
              <PaperText style={styles.my_5} variant="titleMedium">
                {item.course.time}
              </PaperText>
              <View style={{flexDirection: 'row'}}>
                <PaperText style={styles.my_5} variant="titleMedium">
                  <Text style={{fontWeight: 'bold'}}>Status</Text> :{' '}
                  {item.status}
                  {'     '}
                </PaperText>
                <PaperText style={styles.my_5} variant="titleMedium">
                  <Text style={{fontWeight: 'bold'}}>Student Mark</Text> :{' '}
                  {item.mark}
                </PaperText>
              </View>
            </Card.Content>
            <Card.Cover
              style={[styles.roundLess, {height: 150}]}
              source={{uri: item.course.imagUrl}}
            />
            <Card.Actions>
              {item.status != CourseStatus.Certified ? (
                <>
                  <PaperButton onPress={() => showModal(item)} mode="contained">
                    Update
                  </PaperButton>
                  {item.status == CourseStatus.Passed && (
                    <PaperButton
                      onPress={() => {
                        setPdfData(item);
                        setExpDateModal(true);
                        // setCertifyStage(stage1);

                        // setPdfData(item);
                      }}
                      mode="contained">
                      Certify
                    </PaperButton>
                  )}
                </>
              ) : (
                <PaperButton
                  onPress={() =>
                    navigation.navigate('Certification', {userCourse: item})
                  }
                  mode="contained">
                  View Certification
                </PaperButton>
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
          <Input
            label={'Student Mark'}
            placeholder="Place your Text"
            value={selectedUserCourse?.mark.toString()}
            onChangeText={nextValue =>
              setSelectedUserCourse((prev: any) => ({...prev, mark: nextValue}))
            }
          />

          <Select
            label={'Status'}
            selectedIndex={selectedIndex}
            style={styles.my_5}
            value={displayValue}
            onSelect={index => {
              setSelectedIndex(index);
              setSelectedUserCourse((prev: any) => ({
                ...prev,
                status: Object.keys(CourseStatus)[index.row],
              }));
            }}>
            {Object.keys(CourseStatus)
              .filter((v, _i) => v !== CourseStatus.Certified)
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
      <Portal>
        <Modal visible={certifyModal} onDismiss={() => setCertifyModal(false)}>
          <Card style={[styles.roundLess, styles.p_7, styles.m_5]}>
            <Card.Content style={styles.qrDialog}>
              <QRCode
                getRef={c => setQrCode(c)}
                value={pdfData ? angularIp + token : angularIp}
                logo={{}}
              />
              <PaperText variant="titleMedium">{certifyStage}</PaperText>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      <Portal>
        <Modal visible={expDateModal} onDismiss={() => setExpDateModal(false)}>
          <Card>
            <Card.Content>
              <View style={[styles.rowContainer, styles.m_5]}>
                <Toggle checked={lifeTime} onChange={c => setLifeTime(c)}>
                  {`LifeTime: ${lifeTime}`}
                </Toggle>
              </View>
              <Datepicker
                date={new Date(expDate)}
                placeholder="Pick Date"
                onSelect={nextDate => {
                  setExpDate(measureDate(nextDate));
                  // setCertifyModal(true);
                }}
                max={
                  new Date(
                    now.getFullYear() + 10,
                    now.getMonth(),
                    now.getDate(),
                  )
                }
                min={now}
                accessoryRight={props => <Icon name="calendar" size={20} />}
                style={styles.m_5}
                disabled={lifeTime}
              />
              <Button
                title="Generate"
                onPress={() => {
                  setExpDateModal(false);
                  setCertifyStage(stage1);
                  setCertifyModal(true);
                }}
              />
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
}
const measureDate = (date: Date) => {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();
};
let lastToken = '';
const generateToken = (
  id: number,
  userName: string,
  doi: string,
  expD: string | undefined,
) => {
  const token = {
    name: userName,
    dateOfIssuance: doi,
    expDate: expD,
    userId: id,
  };
  const lastToken = Buffer.from(JSON.stringify(token), 'binary').toString(
    'base64',
  );
  console.log(lastToken);

  return lastToken;
};

const renderOption = (title: string, i: number): React.ReactElement => (
  <SelectItem key={i.toString()} title={title} />
);
const update = async (item: any): Promise<any> => {
  return await axios.put(api + '/UserCourse/Update', item, {
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
    alignItems: 'center',
  },
  p_7: {
    padding: 7,
  },
  m_5: {
    margin: 5,
  },
  detailscard: {
    padding: 10,
    margin: 20,
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
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
function filterCourses(
  setfilterdCourses: React.Dispatch<
    React.SetStateAction<UserCourse[] | undefined>
  >,
  userCourses: UserCourse[],
  searchQuery: string,
) {
  setfilterdCourses(
    userCourses.filter(
      v =>
        v.course.courseName.toLowerCase().indexOf(searchQuery.toLowerCase()) >
        -1,
    ),
  );
}

export default StudentCourses;
