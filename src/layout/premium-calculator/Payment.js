import React, {Component, useState} from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {WebView,closeWebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const Payment = props => {
  const navigation = useNavigation();
  const [value, setValue] = useState('')
 
  
  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }


  const enToken = utf8_to_b64(
    `${props.route.params.TokenId}` +
      '|INSURANCE|' +
      `${props.route.params.RefId}` +
      '|' +
      `${props.route.params.Amount}` +
      '|GET|http://203.78.165.19:9078/v1/merchantpayment/Imepayfallback|https://stg.imepay.com.np:7979/api/Web/Recheck',
  );


 
  return (
    <>

    <WebView
    style={{flex: 1}}
    onNavigationStateChange={(e) => {
      
        setValue( e, null, 2)
      if(e.url.indexOf("http://203.78.165.19:9078/v1/merchantpayment/Imepayfallback") > -1) {
        navigation.navigate('PaymentDetails',{value})
      } else{
       
      }
     
  }}
      source={{
        uri:
          'https://stg.imepay.com.np:7979/WebCheckout/Checkout?data=' +
          `${enToken}`,
      }}
    
    />
    </>
  );
};
export default Payment;

