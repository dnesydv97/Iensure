import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import TextStyle from '../../style/text';
import InputStyle from '../../style/input';
import Icon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import {isEmpty} from 'lodash';
const Document = () => {
  const [citizenshipfront, setCitizenshipFront] = useState('');

  const [citizenshipback, setCitizenshipBack] = useState('');

  const [pancard, setPanCard] = useState('');

  const selectCitizenshipFront = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
     

      setCitizenshipFront(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
       
      } else {
     
        throw err;
      }
    }
  };
  const selectCitizenshipBack = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
     

      setCitizenshipBack(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      
      } else {
       
        throw err;
      }
    }
  };
  const selectPanCard = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
    

      setPanCard(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
       
      } else {
      
        throw err;
      }
    }
  };
  const Deletecitizenshipfront = () => {
    setCitizenshipFront();
  };
  const Deletecitizenshipback = () => {
    setCitizenshipBack();
  };
  const DeletePanCard = () => {
    setPanCard();
  };
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={selectCitizenshipFront}
        style={InputStyle.uploadDocument}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 10}}>
            <Image source={require('../../assets/filled.png')} />
          </View>
          <Text style={TextStyle.uploadText}>Upload Citizenship (Front)</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginBottom:15}}/>
      {citizenshipfront ? (
        <View style={{width: 260}}>
          <Image
            style={{
              width: 250,
              height: 250,
              marginTop: 6,
              marginLeft: 10,
              borderRadius: 6, marginBottom:10
            }}
            source={{
              uri: !isEmpty(citizenshipfront) && citizenshipfront[0]?.uri,
            }}
          />
          {!isEmpty(!isEmpty(citizenshipfront) && citizenshipfront[0]?.uri) ? (
            <TouchableOpacity
              onPress={Deletecitizenshipfront}
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
      ) : null}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={selectCitizenshipBack}
        style={InputStyle.uploadDocument}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 10}}>
            <Image source={require('../../assets/filled.png')} />
          </View>
          <Text style={TextStyle.uploadText}>Upload Citizenship (Back)</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginBottom:15}}/>
      {citizenshipback?
      <View style={{width: 260}}>
        <Image
          style={{
            width: 250,
            height: 250,
            marginTop: 6,
            marginLeft: 10,
            borderRadius: 6,
            marginBottom:10
          }}
          source={{uri: !isEmpty(citizenshipback) && citizenshipback[0]?.uri}}
        />
        {!isEmpty(!isEmpty(citizenshipback) && citizenshipback[0]?.uri) ? (
          <TouchableOpacity
            onPress={Deletecitizenshipback}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              marginTop: 6,
              backgroundColor: 'red',
              borderRadius: 50,
            }}>
            <Icon name="delete" size={25} color="#fff" style={{padding: 10}} />
          </TouchableOpacity>
        ) : null}
      </View>:null}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={selectPanCard}
        style={InputStyle.uploadDocument}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 10}}>
            <Image source={require('../../assets/filled.png')} />
          </View>
          <Text style={TextStyle.uploadText}>Upload PAN Card</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginBottom:15}}/>
      {pancard?
      <View style={{width: 260}}>
        <Image
          style={{
            width: 250,
            height: 250,
            marginTop: 6,
            marginLeft: 10,
            borderRadius: 6, marginBottom:10
          }}
          source={{uri: !isEmpty(pancard) && pancard[0]?.uri}}
        />
        {!isEmpty(!isEmpty(pancard) && pancard[0]?.uri) ? (
          <TouchableOpacity
            onPress={DeletePanCard}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              marginTop: 6,
              backgroundColor: 'red',
              borderRadius: 50,
            }}>
            <Icon name="delete" size={25} color="#fff" style={{padding: 10}} />
          </TouchableOpacity>
        ) : null}
      </View>:null
}
    </View>
  );
};

export default Document;
