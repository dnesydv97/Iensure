import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import containerStyle from '../../style/container';
import textStyle from '../../style/text';
import {useSelector} from 'react-redux';

const Setting = ({logout,}) => {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const detectLogin = async () => {
      if (Object.keys(user).length != 0) {
        if (user[0].KycId == 0) {
          
        }
        else {
          setModalVisible(false);
        }
      } else {
        setModalVisible(false);
      }
    };
    detectLogin();
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#FAFAfA', height: '100%', paddingLeft: 15, paddingTop: 15}}>
      <TouchableOpacity onPress={logout} style={{flexDirection: 'row'}}>
        <Icon name="logout" color={'#F57722'} size={26} />
        <Text style={textStyle.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
Setting.defaultProps = {
  kyc: false,
};
Setting.propTypes = {
  /** A function to change navigation helper */
  logout: PropTypes.func.isRequired,

};

export default Setting;
