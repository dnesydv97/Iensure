import React, {useState, useEffect} from 'react';
import {
  View,
  Image,Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,ScrollView
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-paper';
import { isEmpty } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';
const DocumentUpload = ({setDob, dob, validcubic}) => {
  const today = new Date();
  const [filePath, setFilePath] = useState([]);
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
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      multiple: true
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };
  const DeleteCopyBlueBook = key => {
    setFilePath(filePath => filePath.filter((data, i) => i !== key));
    // setEstimated(['']);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <TextInput
          label="Registration Date"
          mode="outlined"
          editable={false}
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={{
            height: 44,
            minWidth: '45%',
            maxWidth: '100%',
            fontSize: 15,
            backgroundColor: '#FAFAFA',
          }}
          // value={dateto}
          // onChangeText={dateto => {
          //   setDobTO(dateto);
          // }}
          value={dob}
          onChangeText={dob => {
            setDob(dob);
          }}
          error={validcubic ? true : false}></TextInput>
        <View>
          <Image
            source={require('../../assets/calendar.png')}
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
              alignSelf: 'flex-end',
              marginTop: -36,

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
          maximumDate={new Date()}
          onChange={onChangeDate}
        />
      ) : null}

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={() => captureImage('photo')}>
        <Text style={styles.textStyle}>Upload Bike Image</Text>
      </TouchableOpacity>
      {/* <Image
           source={{uri: filePath?.assets[0]?.uri}}
          style={styles.imageStyle}
         /> */}
           <ScrollView horizontal={true}>
            {filePath?.assets?.map((item, key) => (
              <View key={key}>
                <View>
                  <Image
                    style={{
                      width: 250,
                      height: 250,
                      marginTop: 6,
                      marginLeft: 10,
                      borderRadius: 6,
                    }}
                    source={{uri: item?.uri}}
                  />
                  {!isEmpty(item?.uri) ? (
                    <TouchableOpacity
                      // onPress={() => DeleteCopyBlueBook(key)}
                      style={{
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        marginTop: 6,
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <Icon
                        name="delete"
                        size={25}
                        color="#fff"
                        style={{padding: 10}}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ))}
          </ScrollView>
    </View>
  );
};

export default DocumentUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'grey',
    // textAlign: 'center',
    fontSize:15
  },
  buttonStyle: {
    // alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 5,
    marginVertical: 16,
   
    borderRadius:5,
    borderWidth:0.4,
    borderColor:'grey'
  
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
