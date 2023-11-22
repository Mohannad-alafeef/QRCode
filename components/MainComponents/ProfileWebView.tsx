import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

function ProfilWebView({route}: any) {
  let {url} = route.params;
  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: url}} />
    </View>
  );
}

export default ProfilWebView;
