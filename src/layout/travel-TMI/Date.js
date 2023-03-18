import React, {useState, useEffect} from 'react';
import {View, Image, Platform, TouchableOpacity} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper';
import moment from 'moment';
const DocumentUpload = ({getFiscalDate, setDobTO, dateto,validBirthDate}) => {
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
  
    setDobTO(dateSelected);
  };

  return (
    <View> 
     <TouchableOpacity onPress={() => setShowCalendar(true)}> 
      <TextInput
        // placeholder={currDate}
        placeholder="2021/11/18"
        label="Date Of Birth"
        mode="outlined"
        editable={false}
        style={{
          marginBottom: 10,
          backgroundColor: '#FAFAFA',
          height: 44,
          paddingHorizontal: 0,

          minWidth: '75%',
          maxWidth: '100%',
        }}
        error={validBirthDate?true:false}
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        value={dateto}
        onChangeText={dateto => {
          setDobTO(dateto);
        }}
        // value={payload.DateOfLoss}
        // onChangeText={DateOfLoss => setPayload({...payload, DateOfLoss:DateOfLoss})}
     ></TextInput>
      <View>
        {/* <Icon
          name="calendar"
          size={20}
          color={'grey'}
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            marginTop: -28,
            paddingRight: 5,
          }}
        /> */}

        <Image
          source={require('../../assets/calendar.png')}
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            alignSelf: 'flex-end',
         marginTop:-45,
            // paddingRight: 25,
            right: 5,
          }}
        />
        </View>
      </TouchableOpacity>
      {showCalendar ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date(moment().subtract(150, "years"))} 

          maximumDate={new Date(moment().subtract(18, "years"))}
        />
      ) : null}
    </View>
  );
};

export default DocumentUpload;
