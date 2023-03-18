import {defaults} from 'lodash';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking, Image} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
const Clients = () => {
  const {portfolio} = useSelector(state => state.SalesAndMarketingReducer);
  const [clientdata, setClientData] = useState();

  useEffect(() => {
    if (!isEmpty(portfolio)) {
      setClientData(portfolio);
    }
  }, [portfolio]);

  const onPressMobileNumberClick = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <>
      <ScrollView>
        {!isEmpty(clientdata) &&
          clientdata?.data?.Table4?.map((data, i) => (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 1,
                padding: 0,
                borderColor: 'rgba(0, 0, 0, 0.15)',
                borderWidth: 0.5,
                borderRadius: 4,
                marginTop: 5,
                // elevation: 3,
                // shadowColor: '#F57722',
                marginTop: 5,
                padding: 10,
                margin:2
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 22,
                  fontStyle: 'normal',
                  fontFamily: 'Roboto',
                  marginTop: 5,
                  color: '#292929',
                }}>
                {data.InsuredName}
              </Text>

              <View
                style={{
              marginTop:8,
                  flexDirection: 'row',
                
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontWeight: '600',
                    alignSelf: 'center',
                    lineHeight:22,
                    fontStyle:'normal'
                  }}>
                  Premium:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontWeight: '600',
                    alignSelf: 'center',
                    lineHeight:22,
                    fontStyle:'normal',marginLeft:4
                  }}>
                  {data.TotPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
                 <TouchableOpacity onPress={() => {onPressMobileNumberClick(data.MOBILENO);}}>
              <View
                style={{
                  marginTop:8,
                  flexDirection: 'row',
               
                }}>
             
                 
                 <Image source={require('../../../assets/branches/call.png')} style={{height:16,width:16,marginTop:2  }}/>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'rgba(0, 0, 0, 0.8)',
                      fontWeight: '400',
                      textAlign:'right',
                      marginLeft:3,
                      
                    }}>
                    {' '}
                    {data.MOBILENO}
                  </Text>
                  <Image source={require('../../../assets/open.png')} style={{height:16,width:16,marginLeft:4.8, }}/>
            
              </View>
                  </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </>
  );
};

export default Clients;
