import axios from 'axios';
import {useEffect, useState} from 'react';
import {api} from '../../../Configs/Connection';
import WebView from 'react-native-webview';
import React from 'react';
import {Text} from 'react-native-paper';

function CourseCertification({route}: any) {
  const {userCourse} = route.params;
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    axios
      .get(api + `/Certification/ByUserCourseId/${userCourse.id}`)
      .then(resp => {
        setUrl(resp.data.certificatonUrl);
      });
  }, []);

  return (
    <>
      <WebView
        style={{width: '100%', height: '100%'}}
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${url}`,
        }}
      />
    </>
  );
}

export default CourseCertification;
