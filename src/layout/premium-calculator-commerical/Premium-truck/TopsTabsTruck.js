import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';

import ComprehensiveTruck from '../Premium-truck/comprenshivetruck/ComprenshiveTruck';
import ThirdPartyTruck from '../Premium-truck/thirdpartytruck/ThirdPartyTruck';
const Tab = createMaterialTopTabNavigator();
const Calculator = ({navigation}) => {
  const {colors} = useTheme();
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" hidden={hidden} />

      {/* <View style={styles.header}>
        <View>
          <ScrollView horizontal>
            <TouchableOpacity onPress={() => navigation.navigate('Calculator')}>
              <Image
                style={styles.imagestyle}
                source={require('../../assets/Arrowblack.png')}
              />
            </TouchableOpacity>
            <Text style={Calculatorstyles.text_header}>
              Motor Cycle Premium
            </Text>
          </ScrollView>
        </View>
      </View> */}

    
        <Tab.Navigator
          initialRouteName="Comprehensive" 
         options={{
          tabBarIcon:{color:'red'}
         }}
         tabBarOptions={{
          activeTintColor: '#F57722',
          inactiveTintColor: '#000',
          pressColor: '#F57722',
          labelStyle: {fontSize: 12},
          tabBarIndicatorStyle:{backgroundColor:'#F57722'},
        }}
        screenOptions={{
          tabBarIndicatorStyle:{backgroundColor:'#F57722'},
        }}
          >
          <Tab.Screen name="Comprehensive" component={ComprehensiveTruck} />
          <Tab.Screen name="Third Party" component={ThirdPartyTruck} />
        </Tab.Navigator>
   
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  imagestyle: {
    height: 125,
    borderWidth: 1,
    borderColor: '#FFF3C5',
    resizeMode: 'contain',
    margin: 4,
  },
  headline: {
    marginLeft: 20,
  },
  header: {
   top:10,
  //backgroundColor:'#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  imagestyle: {
    width: 20,
    height: 20,
  },
});
