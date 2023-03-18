import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import containerStyle from '../../style/container';

import {isEmpty} from 'lodash';
const PaymentMethod = ({route}) => {
  const navigation = useNavigation();
  const handleSubmit = async payload => {
    var date = new Date();
    var axios = require('axios');
    var data = JSON.stringify({
      MerchantCode: 'INSURANCE',
      Amount: '10.23',
      RefId: !isEmpty(route) && route?.params?.paramKey,
      //  RefId:refKey(10),
    });

    var config = {
      method: 'post',
      url: 'https://stg.imepay.com.np:7979/api/Web/GetToken',
      headers: {
        Module: 'SU5TVVJBTkNF',
        'Content-Type': 'application/json',
        Authorization: 'Basic aW5zdXJhbmNlOmltZUAxMjM0',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        navigation.navigate('Payment', response.data);
      })
      .catch(function (error) {});
  };

  return (
    <View contentContainerStyle={containerStyle.dashboardMenuContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity onPress={handleSubmit}>
          <View>
            <Image
              style={{height: 130, width: 210}}
              source={require('../../assets/imepay.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Khalti')}>
          <View>
            <Image
              style={{height: 130, width: 210, marginLeft: -20}}
              source={require('../../assets/payment/khalti.png')}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: -20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Esewa')}>
          <View>
            <Image
              style={{height: 130, width: 210}}
              source={require('../../assets/payment/esewa.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ConnectIPS')}>
          <Image
            style={{height: 130, width: 210, marginLeft: -20}}
            source={require('../../assets/payment/connectips.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethod;
