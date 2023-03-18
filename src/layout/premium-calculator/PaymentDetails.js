import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity,BackHandler,Alert} from 'react-native';
import accordionStyle from '../../style/paypremium';
import {isEmpty} from 'lodash';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import {useNavigation} from '@react-navigation/native';
const PaymentDetails = props => {
  const navigation = useNavigation();
  const details = props.route.params.value.url;
 
  const [save, setSave] = useState('');


  useEffect(() => {
    submit(details);
  }, [details]);
  const submit = (details) => {
    var axios = require('axios');
    var config = {
      method: 'get',
      url: `${details}`,
      headers: {
        Cookie:
          'XSRF-TOKEN=eyJpdiI6IkJNclMrNEhyTnFaOVpuY2lScGFMMlE9PSIsInZhbHVlIjoiSDcxajBQOUtiNWthVThhVTNFWlRjamVlVkFvcnI5QTlkaFZENjIzUm02K280YzhqOHl1TEt1eGVPODYzbm9PKzVMd21VN2JEYktjQ3ZuSUs5RjQ2Z0UvUlBFUDhvQkhHdWJIc3hDZnBzeWZFUHVab1JudHlkWkVNQ1o4NHo4KysiLCJtYWMiOiIxZmU0YzBkMzQ3NjJmMWNlMmQ5MGNkMTljZjA4NTU3ZTJiZGY1YmZiMzE1ODg0NDYxMDA0NDM5OGY0MDRlNDM3IiwidGFnIjoiIn0%3D; test_ebeema_session=l5fwIg4ZlMbBc2Iwf70qHle2ofxpi9wXivvYgm3q',
      },
    };

    axios(config)
      .then(function (response) {
       
        if (response.data) {
          //  const data = (JSON.stringify(response.data));
          const data1 = response.data;
        
          setSave(data1);
        }
      })
      .catch(function (error) {
       
      });
  };
  function handleBackButtonClick() {
    navigation.navigate('Dash');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View style={{padding: 20}}>
      {/* <TouchableOpacity onPress={submit}>
      
        <Text>click show details</Text>
      </TouchableOpacity> */}
      <View style={accordionStyle.accordionContentSection}>
        <View style={{width: '43%'}}>
          <Text style={accordionStyle.accordionContentHeader}>payment</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={{width: '55%'}}>
          <Text style={accordionStyle.accordionContentHeader}>
            {save.response_message}
          </Text>
        </View>
      </View>
      <View style={accordionStyle.accordionContentSection}>
        <View style={{width: '43%'}}>
          <Text style={accordionStyle.accordionContentHeader}>Msisdn</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={{width: '55%'}}>
          <Text style={accordionStyle.accordionContentHeader}>
            {save.msisdn}
          </Text>
        </View>
      </View>
      <View style={accordionStyle.accordionContentSection}>
        <View style={{width: '43%'}}>
          <Text style={accordionStyle.accordionContentHeader}>
            TransactionId
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={{width: '55%'}}>
          <Text style={accordionStyle.accordionContentHeader}>
            {save.transcationid}
          </Text>
        </View>
      </View>
      <View style={accordionStyle.accordionContentSection}>
        <View style={{width: '43%'}}>
          <Text style={accordionStyle.accordionContentHeader}>Amount</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={{width: '55%'}}>
          <Text style={accordionStyle.accordionContentHeader}>
            {save.transcationamount}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#F57722',
            borderRadius: 4,
            alignSelf: 'center',
            height: 44,
            paddingVertical: 11,
            width: '93%',
            marginTop: 51,
          }}
          onPress={() => {
            navigation.navigate('PolicyMaking', {paramKey: save}),
             
              Alert.alert('Information', ' Your Payment Successfully Paid.', [
                {
                  text: 'Okay',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'Okay',
                },
              ]);
          }}>
          <Text style={textStyle.loginText}>Make Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentDetails;
