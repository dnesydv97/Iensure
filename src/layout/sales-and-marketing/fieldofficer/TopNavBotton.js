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

//import Step1Styles from '../../Home/KYC/Steps/KycStepone/Step1.styles';
import {useTheme} from 'react-native-paper';
//import Calculatorstyles from '../Calculatorstyles';

//import Thirds from '../Bike/Thirdparty/Thirds';
import Summary from './Summary';
import Clients from './Clients';
import BikeThirdParty from '../../premium-calculator/thirdparty/BikeThirdParty';
const Tab = createMaterialTopTabNavigator();
const Calculator = ({navigation}) => {
  const {colors} = useTheme();
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container}>
     
      <Tab.Navigator
        initialRouteName="BikeCalculator"
        tabBarPosition="top"

        options={{
          tabBarIcon: {color: '#FAFAFA'},
        }}
        screenOptions={{
          tabBarStyle: {
            // height: 40,
            // paddingHorizontal: 5,
            // paddingTop: 0,
            backgroundColor: '#FAFAFA',
        
            // position: 'absolute',
            // borderTopWidth: 0,
        },
            // tabBarItemStyle: { width: 100 },
            //  tabBarStyle: { backgroundColor: 'powderblue' },
            tabBarIndicatorStyle:{backgroundColor:'#F57722'},
           
          }}
        tabBarOptions={{
          activeTintColor: '#F57722',
          inactiveTintColor: '#000000',
          pressColor: '#F57722',
          labelStyle: {fontSize: 12}


        }}>
        <Tab.Screen name="Summary" component={Summary} />
        <Tab.Screen name="Clients" component={Clients} />
      </Tab.Navigator>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff'
     
    },
   
  });
  