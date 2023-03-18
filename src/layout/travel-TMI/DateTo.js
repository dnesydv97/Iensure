import React, {useState, useEffect} from 'react';
import {View, Image, Platform, TouchableOpacity} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper';

const DocumentUpload = ({setDateTO, dateto,validDateTo}) => {
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
   
    setDateTO(dateSelected);
  };

  return (
    <View>
       <TouchableOpacity onPress={() => setShowCalendar(true)}>
      <TextInput
        placeholder="2021/11/18"
        label="Date To"
        mode="outlined"
        style={{
          marginBottom: 10,
          backgroundColor: '#FAFAFA',
          height: 44,
          paddingHorizontal: 0,

          minWidth: '47%',
          maxWidth: '100%',
        }}
        editable={false}
        error={validDateTo?true:false}
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        value={dateto}
        onChangeText={dateto => {
          setDateTO(dateto);
        }}
        ></TextInput>
     <View>
        <Image
          source={require('../../assets/calendar.png')}
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            alignSelf: 'flex-end',
            marginTop: -45,

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
          minimumDate={new Date()}
        />
      ) : null}
    </View>
  );
};

export default DocumentUpload;
