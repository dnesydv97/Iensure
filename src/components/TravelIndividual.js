import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import InputStyle from '../style/input';
import {TextInput} from 'react-native-paper';
// import DropDown from '../module/react-native-paper-dropdown';
import Checkbox from '@react-native-community/checkbox';
import moment from 'moment';
import Dateto from '../layout/travel-TMI/Date';
import {DollarRate} from '../redux/actions/TMIAction';
import propTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
const TravelIndividual = ({
  payload,
  setPayload,
  setDobTO,
  dateto,
  premium,
  setPremium,
  annualtrip,
  setAnnualTrip,
  DollarRate,
  validBirthDate,
}) => {
  // const [showDropDown, setShowDropDown] = useState(false);
  const age = moment().diff(dateto, 'years');
  const {rate} = useSelector(state => state.TMIReducer);
  const currencyName =
    !isEmpty(rate) && rate?.data?.map(value => value.CurrencyName);
  const currencySell = !isEmpty(rate) && rate?.data?.map(value => value.Sell);

  useEffect(() => {
    fetchMetaData();
  }, []);
  const fetchMetaData = async () => {
    DollarRate({CountryCode: 'USD'});
  };

  const coverList = [
    {
      label: 'Individual',
      value: '0',
    },
    {
      label: 'Corporate',
      value: '1',
    },
    {
      label: 'Others',
      value: '2',
    },
  ];

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label="Name"
          mode="outlined"
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          keyboardType="default"
          value={payload.Name}
          onChangeText={NAME => setPayload({...payload, NAME})}
        />
        {/* <View style={InputStyle.dropdown}>
          <DropDown
            label={'Premium'}
            mode={'outlined'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={premium}
            setValue={setPremium}
            list={coverList}
            header={2}
          />
        </View> */}

        <TextInput
          label="Contact Number"
          mode="outlined"
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          keyboardType="phone-pad"
          value={payload.PHONE}
          onChangeText={PHONE => setPayload({...payload, PHONE})}
        />
        <TextInput
          label="Passport Number"
          mode="outlined"
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          keyboardType="default"
          value={payload.PASSPORT}
          onChangeText={PASSPORT => setPayload({...payload, PASSPORT})}
        />
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 4,
            justifyContent: 'space-between',
          }}>
          <Dateto
            setDobTO={setDobTO}
            dateto={dateto}
            validBirthDate={validBirthDate}
          />
          <View
            style={{
              backgroundColor: '#F57722',
              borderRadius: 4,
              height: 46,
              paddingVertical: 8,
              marginTop: 6,
              width: 75,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#fff',
                fontWeight: '500',

                textAlign: 'center',
              }}>
              age {age == age ? age : '0'}
            </Text>
          </View>
        </View>
        <TextInput
          label="Remarks"
          mode="outlined"
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          keyboardType="name-phone-pad"
          value={payload.REMARK}
          onChangeText={REMARK => setPayload({...payload, REMARK})}
        />
        <View style={styles.premium}>
          <Text style={styles.premiumdesign}>Premium</Text>
          <Text style={styles.rate}>{currencyName}</Text>
        </View>
        <View style={styles.premium}>
          <Text style={styles.premiumdesign}>Per Dollar Rate Today(Rs.)</Text>
          <Text style={styles.rate}>{currencySell}</Text>
        </View>

        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            // value={payload.EXCLUDE_POOL}
            // onValueChange={EXCLUDE_POOL =>
            //   setPayload({...payload, EXCLUDE_POOL})
            // }
            value={annualtrip}
            onValueChange={setAnnualTrip}
            tintColors={{true: '#F57722', false: '#C7C7CC'}}
          />
          <Text>Is Annual Trip</Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  premium: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 4,
    paddingStart: 4,
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
    height: 46,
    paddingVertical: 10,

    marginBottom: 10,
    width: '100%',
  },
  premiumdesign: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400',
    marginLeft: 12,
    textAlign: 'center',
  },
  rate: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400',
    paddingEnd: 4,
    marginTop: 2,
    textAlign: 'center',
  },
});
TravelIndividual.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.TMIReducer,
});
export default connect(mapStatesToProps, {
  data,
  DollarRate,
})(TravelIndividual);
