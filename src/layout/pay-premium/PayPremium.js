import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import accordionStyle from '../../style/paypremium';
import {isEmpty} from 'lodash';

const PayPremium = ({route}) => {
  const navigation = useNavigation();

  const premimumData = route?.params?.paypremimumResp;

  return (
    !isEmpty(premimumData) && (
      <View style={accordionStyle.container}>
        <ScrollView>
          <View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Insured
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {/* {!isEmpty(premimumData) && premimumData?.properties?.insured} */}
                </Text>
              </View>
            </View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Proforma No.
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {/* {!isEmpty(premimumData) &&
                  premimumData?.properties?.proformaNo.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )} */}
                </Text>
              </View>
            </View>

            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Vehicle
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {/* {!isEmpty(premimumData) && premimumData?.properties?.className} */}
                </Text>
              </View>
            </View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Vehicle No.
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {/* {!isEmpty(premimumData) && premimumData?.properties?.VehicleNo} */}
                </Text>
              </View>
            </View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Sum Insured
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {/* {parseFloat(
                  !isEmpty(premimumData) && premimumData?.properties?.sumInsured,
                )
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
                </Text>
              </View>
            </View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Sub Sidized Premium
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {/* {!isEmpty(premimumData) && premimumData?.properties?.subsidizedPremium} */}
                </Text>
              </View>
            </View>
            <View style={accordionStyle.accordionContentSection}>
              <View style={{width: '43%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  Total Premium
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={{width: '55%'}}>
                <Text style={accordionStyle.accordionContentHeader}>
                  {/* {parseFloat(
                  !isEmpty(premimumData) && premimumData?.properties?.totalPremium,
                )
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              alignSelf: 'flex-end',
              width: '100%',
            }}>
            <TouchableOpacity
              style={accordionStyle.botton}
              onPress={() => navigation.navigate('PaymentMethod')}>
              <Text style={accordionStyle.bottontext}> Pay Premium</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default PayPremium;
