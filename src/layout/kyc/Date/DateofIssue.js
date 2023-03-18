import React, {useState, useEffect} from 'react';
import {

  View,

  Image,

  Platform,


  TouchableOpacity,
  Pressable,
} from 'react-native';

import InputStyle from '../../../style/input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';

const DocumentUpload = ({ setDob, datefrom,issueDateValid}) => {


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
      
        label="Citizenship Issue Date *"
        mode="outlined"
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        style={InputStyle.textInput}
        value={datefrom}
        editable={false}
        // maxLength={10}
        onChangeText={datefrom => {
          setDob(datefrom);
        }}
      error={issueDateValid?true:false}
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
             marginTop: -45,
            // paddingRight: 20,
            right: 10,
          }}
        />
    </View>
      {showCalendar ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="calendar"
          onChange={onChangeDate}
          maximumDate={today}
        />
      ) : null}
    </View>
  );
};

 export default DocumentUpload;
