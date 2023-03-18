import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator,useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import FeatherIcons from 'react-native-vector-icons/Feather';

import {Image} from 'react-native'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import Home from '../containers/home/DashBoardScreen';

import Setting from '../containers/home/SettingScreen';

import Proposal from '../layout/home/Proposal/Proposal';
import MyPolicy from '../layout/home/mypolicy/MyPolicy';
import SalesDashBoard from '../layout/sales-and-marketing/SalesDashBoard'

import { useSelector} from 'react-redux';
import { isEmpty } from 'lodash';

const TabbarScreen = () => {
  const user = useSelector(state => state.auth.user);


  const staffid = !isEmpty(user) && user[0]?.StaffId;
  //  const staffid = !isEmpty(user) && user?.map(data => data.StaffId);
  
 
return(
 
  <Tab.Navigator
    initialRouteName="Home"
    // tabBarOptions={{activeTintColor: '#F57722', inactiveTintColor: '#5B5B5B'}} 
  sceneContainerStyle={{height:500}}
    barStyle={{backgroundColor: '#F5F5F5'}}
  // screenOptions={{tabBarStyle:{height:70}}}

  screenOptions = {({ route }) =>({
    tabBarActiveTintColor:'#F57722',
    tabBarInactiveTintColor: '#5B5B5B',
   
        tabBarStyle:{height:70},
   
     
    
tabBarIcon: ({ color }) => 
screenOptions(route, color),
  
})}
    >

    <Tab.Screen
      name="Home"
      component={Home}
     
      options={{
        headerShown: false,
        tabBarLabelStyle: {fontWeight: '500', fontSize: 10,marginBottom:20},
        shifting: 'true',
        tabBarColor: '#E5E5E5',
        tabBarIcon: ({color, size}) => (
          <Image source={require('../assets/tabbaricon/home.png')} style={{width:25,height:25,marginTop:5}} color={color} />
        ),
      }}
    />
{staffid > 0? 
    <Tab.Screen
   name="Marketing"
   component={SalesDashBoard}
   
   options={{
     headerShown: false,
    
     tabBarLabelStyle: {fontWeight: '500', fontSize: 10,marginBottom:20},
    // tabBarLabel: 'Plans',
     tabBarIcon: ({color}) => (
       // <MaterialCommunityIcons
       //   name="calendar-text-outline"
       //   color={color}
       //   size={26}
       // />
       <Image source={require('../assets/tabbaricon/market.png')} style={{width:25,height:25,marginTop:5}} color={color} />
     ),
   }}
 />:null}
    <Tab.Screen
      name="My Policy"
      component={MyPolicy}
   
      options={{
        headerShown: true,
   
        tabBarLabelStyle: { fontSize: 10,marginBottom:20},
        tabBarLabel: 'My Policy',
        tabBarIcon: ({color}) => (
          // <Icon name="receipt-outline" color={color} size={26} />
          <Image source={require('../assets/tabbaricon/policy.png')} style={{width:25,height:25,marginTop:5}} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Proposal"
      component={Proposal}
      options={{
      
        headerShown: true,
        tabBarLabelStyle: {fontWeight: '500', fontSize: 10,marginBottom:20},
        tabBarLabel: 'Proposal',
        tabBarIcon: ({color}) => (
          //  <Icons name="filetext1" color={color} size={19} />
          <Image source={require('../assets/tabbaricon/proposal.png')} style={{width:25,height:25,marginTop:5}} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="settings"
      component={Setting}
  
      options={{
        tabBarLabelStyle: {fontWeight: '500', fontSize: 10,marginBottom:20},
        tabBarLabel: 'Settings',
     
        tabBarIcon: ({color}) => (
          <FeatherIcons name="settings" color={color} size={21}  style={{width:25,height:25,marginTop:7}}/>
        ),
      }}
    />
  </Tab.Navigator>

)};
export default TabbarScreen;
