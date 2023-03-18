import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  StatusBar,

  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getFiscalDate} from '../../redux/actions/SalesAndMarketingAction';
import styles from '../../style/claimintimation';
import { TextInput } from 'react-native-paper';
import {isEmpty} from 'lodash';
const DocumentUpload = ({getFiscalDate, setDob, datefrom}) => {
  const {date1} = useSelector(state => state.SalesAndMarketingReducer);
  const currDate = moment().format('YYYY/MM/DD');
  const [dateRange, setDateRange] = useState();

  useEffect(() => {
    let i = 0;
    if (!isEmpty(date1)) {
      setDateRange(date1);
    }
  }, [date1]);
  useEffect(() => {
    yearRange();
  }, []);

  const yearRange = async () => {
    getFiscalDate({FiscalId: 40});
  };

  const today = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date(today), true);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === 'ios');
    setDate(currentDate);
    

    var dateSelected = currentDate
      .toISOString()
      .replace('-', '/')
      .split('T')[0]
      .replace('-', '/');
   
    setDob(dateSelected);
  };

  return (
    <View>
      <TextInput
        // placeholder="2021/09/01"
        label="YYYY/MM/DD"
        mode="outlined"
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        maxLength={10}
        style={{
          // marginTop: 5,
          // borderRadius: 4,
          // paddingVertical: 2,
          // borderWidth: 1,
          // fontSize: 14,
          borderColor: 'rgba(0, 0, 0, 0.2)',
          // paddingLeft: 15,
height:35,
          minWidth: '45%',
          maxWidth: '100%',
          fontSize: 14,
          backgroundColor:'#fff'
        }}
        value={datefrom}
        onChangeText={datefrom => {
          setDob(datefrom);
        }}
        onFocus={() => setShowCalendar(true)}>
          
        </TextInput>
      <TouchableOpacity>

        <Image
          source={require('../../assets/calendar.png')}
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            alignSelf: 'flex-end',
            marginTop: -31,
            paddingRight: 20,
            right: 5,
          }}
        />
      </TouchableOpacity>
      {showCalendar ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      ) : null}
    </View>
  );
};

DocumentUpload.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.SalesAndMarketingReducer,
});
export default connect(mapStatesToProps, {
  getFiscalDate,
})(DocumentUpload);
