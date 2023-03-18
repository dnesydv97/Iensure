import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import accordionStyle from '../../style/accordion';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

const GetMyPolicy = ({route}) => {
  const navigation = useNavigation();

  const policyData = route?.params?.checkPolicyData;

  return (
    !isEmpty(policyData) && (
      <View>
        <ScrollView style={{padding: 15}}>
          <View style={{marginBottom: 50}}>
          {!isEmpty(policyData) &&
              policyData?.data?.PolicyDetails?.map((data, i) => (
                <View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        NAME
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.NAME}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        NEPTITLE
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '49%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.NEPTITLE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        ADDRESS
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '49%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.ADDRESS}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        POLICYNO
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.POLICYNO}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        ProformaNo
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.ProformaNo}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        SUMINSUREDBALANCE
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.SUMINSUREDBALANCE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        FISCALYEAR
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.FISCALYEAR}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        TotalPremium
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.TotalPremium}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        CREATEDDATE
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.CREATEDDATE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        EXPIRYDATE
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.EXPIRYDATE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        PREMIUMBALANCE
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.PREMIUMBALANCE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        THIRDPARTYPREMIUM
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.THIRDPARTYPREMIUM}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Stampduty
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.Stampduty}
                        {/* {parseFloat(!isEmpty(test) && test?.data[0]?.NetPremium).toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        TaxableTotalAmount
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.TaxableTotalAmount}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        VATAMT
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data?.VATAMT}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        SUMINSUREDBALANCE1
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.SUMINSUREDBALANCE1}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            {!isEmpty(policyData) &&
              policyData?.data?.VehicleDetails?.map(data => (
                <View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                    VEHICLENO
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data?.VEHICLENO}
                    </Text>
                  </View>
                </View>
                   <View style={accordionStyle.accordionContentSection}>
                   <View style={{width: '50%'}}>
                     <Text style={accordionStyle.accordionContentHeader}>
                     ENGINENO
                     </Text>
                   </View>
                   <View>
                     <Text>:</Text>
                   </View>
                   <View style={{width: '50%'}}>
                     <Text style={accordionStyle.accordionContentHeader}>
                       {data?.ENGINENO}
                     </Text>
                   </View>
                 </View>
                   <View style={accordionStyle.accordionContentSection}>
                   <View style={{width: '50%'}}>
                     <Text style={accordionStyle.accordionContentHeader}>
                     CHASISNO
                     </Text>
                   </View>
                   <View>
                     <Text>:</Text>
                   </View>
                   <View style={{width: '50%'}}>
                     <Text style={accordionStyle.accordionContentHeader}>
                       {data?.CHASISNO}
                     </Text>
                   </View>
                 </View>
                 </View>
              ))}
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default GetMyPolicy;
