import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import TextStyle from '../../style/text'
import InputStyle from '../../style/input'

// import styles from './Step3Style';

import DocumentPicker from 'react-native-document-picker';

const Document = () => {
  const [singleFile, setSingleFile] = useState('');
  const [singleFile1, setSingleFile1] = useState('');

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
     

      setSingleFile(res);
    } catch (err) {
   
      if (DocumentPicker.isCancel(err)) {
      
       
      } else {
      
      
        throw err;
      }
    }
  };
  const selectTwoFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
    

      setSingleFile1(res);
    } catch (err) {
     
      if (DocumentPicker.isCancel(err)) {
       
     
      } else {
       
     
        throw err;
      }
    }
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={selectOneFile} style={InputStyle.upload}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 10}}>
            <Image source={require('../../assets/filled.png')} />
          </View>
          <Text
            style={TextStyle.uploadText}>
            Upload Company Registration
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 15,
          color: 'black',
          marginLeft: 0,
          // marginRight: 120,
        }}>
        {singleFile.name ? singleFile.name : ''}
      </Text>

      <TouchableOpacity activeOpacity={0.5} onPress={selectTwoFile} style={InputStyle.upload}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 10}}>
            <Image source={require('../../assets/filled.png')} />
          </View>
          <Text
            style={TextStyle.uploadText}>
            Upload Pan No.
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 15,
          color: 'black',
          marginLeft: 0,
          // marginRight: 120,
        }}>
        {singleFile1.name ? singleFile1.name : ''}
      </Text>
    </View>
  );
};

export default Document;
