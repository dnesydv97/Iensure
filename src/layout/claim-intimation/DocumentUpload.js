import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,

  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {Provider, DefaultTheme, TextInput} from 'react-native-paper';
import {launchCamera} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../../style/claimintimation';
import {isEmpty} from 'lodash';
import InputStyle from '../../style/input';

const DocumentUpload = ({
  setDob,
  dob,
  remark,
  setRemark,
  filePath,
  setFilePath,
  setsingleFile,
  singleFile,
  photo,
  validRemark,
  dateloss,
}) => {

 

  const today = new Date();

  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date(today));

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
       
       
      }
      return false;
    } else return true;
  };
  const DeleteCopyBlueBook = key => {
    setsingleFile(prev => prev.filter((data, i) => i !== key));
    // setEstimated(['']);
  };
  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'high',
      durationLimit: 13, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
       

        if (response.didCancel) {
       
          return;
        } else if (response.errorCode == 'camera_unavailable') {
       
          return;
        } else if (response.errorCode == 'permission') {
        
          return;
        } else if (response.errorCode == 'others') {
        
          return;
        }

        setFilePath(response);
      });
    }
  };
  // const selectOneFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     setsingleFile(res);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       alert('Canceled from single doc picker');
  //     } else {
  //       alert('Unknown Error: ' + JSON.stringify(err));
  //       throw err;
  //     }
  //   }
  // };
  const selectMultipleBlueBook = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
      
      
       
      }
    
      setsingleFile([...singleFile,...results]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
      
      } else {
        //For Unknown Error
       
        throw err;
      }
    }
  };

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
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <Provider theme={theme}>
      <SafeAreaView style={{flex: 1}}>
        <View>
          <TextInput
            // placeholder={currDate}
            label={'Select Date Of Loss'}
            // defaultValue={date}
            theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
            style={(InputStyle.textInput, {width: '100%', height: 50,backgroundColor:'#FAFAFA'})}
            mode="outlined"
            error={dateloss ? true : false}
            // style={InputStyle.geoLocation}
            value={dob}
            onChangeText={dob => {
              setDob(dob);
            }}
            onFocus={() => setShowCalendar(true)}></TextInput>

          <Image
            source={require('../../assets/calendar.png')}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              marginTop: 15,
              right: 15,
              height: 30,
              width: 30,
            }}
          />

          {showCalendar ? (
            <DateTimePicker
              singleFileID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
              maximumDate = {new Date()}
            />
          ) : null}
        </View>
        <View style={{marginTop: 10}} />
        <View>
          <TextInput
            label="Remark"
            style={(InputStyle.textInput, {width: '100%', height: 50})}
            mode="outlined"
            theme={{colors: {primary: '#F57722', underlineColor: '#FAFAFA'}}}
            // style={InputStyle.geoLocation}
            keyboardType="default"
            value={remark}
            onChangeText={remark => {
              setRemark(remark);
            }}
            error={validRemark ? true : false}
          />
        </View>
       
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => captureImage('video')}
         
          style={styles.upload}
          >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 10}}>
              <Image source={require('../../assets/filled.png')} />
            </View>
            <Text style={{color: 'rgba(0,0,0,0.4)', fontWeight: '600', fontSize: 16}}>
              Accident Video
            </Text>
          </View>
        </TouchableOpacity>

        {!isEmpty(filePath) ? (
          <Image
            source={{uri: !isEmpty(filePath) && filePath?.assets[0]?.uri}}
            style={styles.imageStyle}
          />
        ) : null}

        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={selectMultipleBlueBook}
            style={photo ? styles.Errorupload : styles.upload}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginRight: 10}}>
                <Image source={require('../../assets/filled.png')} />
              </View>
              <Text style={photo ? styles.uploadTextError : styles.uploadText}>
                Accident Photo
              </Text>
            </View>
          </TouchableOpacity>
          <ScrollView horizontal={true}>
            {singleFile.map((item, key) => (
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
                      onPress={() => DeleteCopyBlueBook(key)}
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
      </SafeAreaView>
    </Provider>
  );
};

export default DocumentUpload;
