import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (isInternetReachable) {
    return null;
  }
  return (
    <SafeAreaView style={{backgroundColor: 'red'}}>
      <Text
        style={{
          backgroundColor: '#b52424',
          height: 40,
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'row',
          padding: 10,
         
        }}>
        No Internet connection
      </Text>
    </SafeAreaView>
  );
};
export default App;
