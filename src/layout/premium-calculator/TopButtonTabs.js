import React, {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';
import BikeCalculator from './BikeCalculator';
import BikeThirdParty from './thirdparty/BikeThirdParty';
const Tab = createMaterialTopTabNavigator();
const Calculator = ({navigation}) => {
  const {colors} = useTheme();
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" hidden={hidden} />
      <Tab.Navigator
        initialRouteName="BikeCalculator"
        options={{
          tabBarIcon: {color: 'red'},
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
        <Tab.Screen name="Full Insurance" component={BikeCalculator} />
        <Tab.Screen name="Third Party" component={BikeThirdParty} />
      </Tab.Navigator>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    top: 10,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  imagestyle: {
    width: 20,
    height: 20,
  },
});
