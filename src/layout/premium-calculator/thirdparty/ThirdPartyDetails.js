import React from 'react';
import { View, Text ,ScrollView,TouchableOpacity} from 'react-native'

import {useNavigation} from '@react-navigation/native';
import accordionStyle from '../../../style/paypremium';
const ThirdPartyDetails =({route})=> {
  
    const thirdPartyData =route?.params?.ThirdpartyValue
    const thirdPartycalcData =route?.params?.Thirdpartycalc?.PremDetails
    const navigation =useNavigation()
  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: 10}}>
    <ScrollView showsVerticalScrollIndicator={false}>
   
          <View
            style={{
              marginTop: -10,
              marginBottom: 25,
              borderRadius: 8,
              padding: 5,
              backgroundColor: 'rgba(243, 243, 243, 1)',

              elevation: 5,
              marginTop: -10,
            }}>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Coverage
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  
                    Third Party
                 
                </Text>
              </View>
            </View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Vehicle Category
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Motor Cycle
                </Text>
              </View>
            </View>

            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Manufacture Year
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {thirdPartyData.YEARMANUFACTURE} AD
                </Text>
              </View>
            </View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Cubic Capacity
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {thirdPartyData.CCHP}
                </Text>
              </View>
            </View>

            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                BASICPREMIUM
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Rs{' '}
                  {parseFloat(thirdPartycalcData.BASICPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                DRIVERPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                Rs {parseFloat(thirdPartycalcData.DRIVERPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                HELPERPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.HELPERPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                NETPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.NETPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                OTHERPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.OTHERPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                PASSENGERPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.PASSENGERPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                POOLPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.POOLPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                STAMP

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.STAMP)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                THIRDPARTYPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.THIRDPARTYPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                VATABLEPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.VATABLEPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                VATAMOUNT

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.VATAMOUNT)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
           
           <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                ACTUALNETPREMIUM

                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                 Rs {parseFloat(thirdPartycalcData.ACTUALNETPREMIUM)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
           
          
          
          
          </View>
     

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#F57722',
            borderRadius: 5,
            padding: 10,
            // alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 10,
            width: '100%',
            // marginLeft: 40,
          }}
          onPress={() => navigation.navigate('PremiumCalculatorTwo')}>
          <Text style={{color: 'white', fontSize: 15}}>Proceed</Text>
        </TouchableOpacity>
      </View>


    

    </ScrollView>
  </View>
  )
}
export default ThirdPartyDetails;