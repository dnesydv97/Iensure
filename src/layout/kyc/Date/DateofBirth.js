import React, {useState, useEffect} from 'react';
import {View, Image, Platform, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import InputStyle from '../../../style/input';
import DateTimePicker from '@react-native-community/datetimepicker';

const DocumentUpload = ({setDob, datefrom, birthdateValid}) => {
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
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
      <TextInput
        label="Date of Birth *"
        mode="outlined"
        maxLength={10}
        editable={false}
        error={birthdateValid ? true : false}
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        style={InputStyle.textInput}
        value={datefrom}
        onChangeText={datefrom => {
          setDob(datefrom);
        }}
        ></TextInput>
        </TouchableOpacity>
      <View>
        <Image
          source={require('../../../assets/calendar.png')}
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            alignSelf: 'flex-end',
            marginTop: -46,

            right: 5,
          }}
        />
      </View>
      {showCalendar ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      ) : null}
    </View>
  );
};

export default DocumentUpload;
