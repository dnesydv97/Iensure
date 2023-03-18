import {View,Image} from 'react-native';
import React from 'react';

const Logo = () => {
  return (
    <View>
      <Image
               resizeMode="contain"
               style={{width:200,height:160,alignSelf:'center'}}
              source={require('../../assets/splash/primelogo.png')}
            />
    </View>
  );
};
export default Logo;
