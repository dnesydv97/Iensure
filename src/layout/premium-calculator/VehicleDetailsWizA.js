import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity,ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import accordionStyle from '../../style/paypremium';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
const VehicleDetailsWizA = () => {
  const [useData, setUseData] = useState([]);
  const navigation = useNavigation();
  const {wizA} = useSelector(state => state.ProposalReducer);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isEmpty(wizA)) {
      setLoading(false)
      setUseData(wizA?.data);
    }
    else {
      setLoading(true);
    }
  }, [wizA]);

  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? 
            <ActivityIndicator
              size="large"
              color="#F57722"
              style={{marginTop: 300,justifyContent: 'center',
                alignItems: 'center',flex:1}}
            />
          : 
          <View>
        {!isEmpty(useData) &&
          useData?.map((data, i) => (
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
                    {data.TYPECOVER == 'CM' ? (
                      <Text>First Party</Text>
                    ) : (
                      'Third Party'
                    )}
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
                    {data.CATEGORYNAME}
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
                    {data.YEARMANUFACTURE} AD
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
                    {data.CCHP}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Vehicle Cost
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Rs.{' '}
                    {parseFloat(data.ESTCOST)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Voluntary Excess
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {parseFloat(data.EODAMT)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    No. of Discount Year
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.NCDYR} years
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    No. of Passenger
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.NOOFPASSENGER}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Exclude pool
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.EXCLUDE_POOL == '0'
                      ? '-'
                      : data.EXCLUDE_POOL == '1'
                      ? 'Yes'
                      : null}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Is Government
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.ISGOVERNMENT == '0'
                      ? '-'
                      : data.ISGOVERNMENT == '1'
                      ? 'Yes'
                      : null}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Basic Premium
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Rs.{' '}
                    {parseFloat(data.BASICPREMIUM_A)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                  Payable Premium
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Rs.{' '}
                    {parseFloat(data.PayablePremium)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
            </View>
          ))}

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
        </View>
}
      </ScrollView>
    </View>
  );
};

export default VehicleDetailsWizA;
