import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,StyleSheet
} from 'react-native';
import {Avatar, Badge} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import AvatarUpload from '../../components/kyc/AvatarUpload'
import Icon from 'react-native-vector-icons/Feather';
import {getProfileUpload} from '../../redux/actions/KycActions';
import {connect, useSelector, useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
const headerComponent = ({ name}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const Regd = !isEmpty(user) && user[0]?.Regd_ID;
  const {profile} = useSelector(state => state.KycFormReducer);
  useEffect(() => {
    dispatch(getProfileUpload({Regd_ID: Regd}));
  }, [profile]);
  return (
 
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 15,
        alignItems: 'center',
        maxWidth:'100%'
      }}>
      <View style={{width:'40%'}}>
        <TouchableOpacity onPress={() => navigation.navigate('settings')}>
     <AvatarUpload size={50} imageHeight={styles.Imageheig} imageHeightContainer={styles.imageHeightContainer} camera={false} />
        {/* <Avatar.Image size={35} source={require('../../assets/avatar.png')} /> */}
        {!isEmpty(user)?
        <Badge
          style={{position: 'absolute', top: 0, left:35,backgroundColor:'green'}}
          size={12}>

          </Badge>: <Badge
          style={{position: 'absolute', top: 0, left:35,backgroundColor:'red'}}
          size={12}>

          </Badge>}
          </TouchableOpacity>
        <Text>{name}</Text>

      </View>

    
      <View style={{width:'30%'}} >
        <Text style={{fontWeight: '500', fontSize: 20, color: '#F57722'}}>
          iEnsure
        </Text>
      </View >
      <View style={{width:'30%',alignItems:'flex-end'}} >
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={25} color="#000" />
          {/* <Badge size={20}
            style={{position: 'absolute', top: -10, left: 12,backgroundColor:'#F57722'}}>
            <Text style={{fontSize:10}}>10</Text> 
          </Badge> */}
        </TouchableOpacity>
      </View>
    </View>
   
  );
};

export default headerComponent;

const styles = StyleSheet.create({


  Imageheig:{
    height:50,
    width:'100%',
 
  },
  imageHeightContainer:{
    width:50,
    height:50
  }
});