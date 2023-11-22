import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Text, useTheme} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Buffer} from 'buffer';

function QrScanner({navigation}: any) {
  let theme = useTheme();

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={({data}) => handleData(data, navigation)}
        reactivate
        reactivateTimeout={5000}
        showMarker
        markerStyle={{
          borderColor: theme.colors.primary,
          borderWidth: 5,
        }}
        vibrate={false}
      />
    </View>
  );
}
function handleData(data: string, navigation: any): void {
  let url = data.split('/');
  if (url.length > 1) {
    let token = url[url.length - 1];
    console.log(token);
    let binaryObj = Buffer.from(token, 'base64').toString('binary');
    let certiObj = JSON.parse(binaryObj);
    if (certiObj.userId) {
      navigation.navigate('ProfileWebView', {url: data});
    }
  } else {
    console.log('none');
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QrScanner;
