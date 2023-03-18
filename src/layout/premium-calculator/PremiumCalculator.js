import React from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,Alert
} from 'react-native';
import containerStyle from '../../style/container';
import imageStyle from '../../style/image';
import textStyle from '../../style/text';

const PremiumCalculator = ({navigation}) => {
  return (
    <ScrollView>
      <View contentContainerStyle={containerStyle.dashboardMenuContainer}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <TouchableOpacity
            activeOpacity={.9}
              style={{
                width: '48%',
              }}
              onPress={() => navigation.navigate('TopButtonTabs')}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 101,
                  alignItems: 'flex-start',
                  borderColor: '#FDE7E4',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                  elevation:5
                }}>
                <Image
                  style={{  width:34 ,height: 24,alignSelf: 'center',marginBottom: 15,marginTop: 30}}
                  source={require('../../assets/premium-calculator/motorcycle.png')}
                />
                <Text style={textStyle.dashboardCardMenuText}>Motorcycle</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity    activeOpacity={.9} onPress={() => {navigation.navigate('TopTapsCar')}}
              style={{
                width: '48%',
              }}
             // onPress={() => navigation.navigate('CarCalculator')}
              >
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 101,
                  borderColor: '#FDE7E4',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                  elevation:5
                }}>
                <Image
                  style={imageStyle.premiumCalCardMenu}
                  source={require('../../assets/premium-calculator/private-motor.png')}
                />
                <Text style={textStyle.dashboardCardMenuText}>
                  Private Motor
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <TouchableOpacity    activeOpacity={.9} onPress={() =>{ navigation.navigate('TopsTabsTruck')}}
              style={{
                width: '48%',
              }}
             // onPress={() => navigation.navigate('CommercialMotorCalculator')}
              >
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 101,
                  alignItems: 'flex-start',
                  borderColor: '#FDE7E4',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                  elevation:5
                }}>
                <Image
                  style={imageStyle.premiumCalCardMenu}
                  source={require('../../assets/premium-calculator/goods-carrying.png')}
                />
                <Text style={textStyle.dashboardCardMenuText}>
                  Commercial Vehicle
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
               activeOpacity={.9}
            
            onPress={() => navigation.navigate('Travel')}
              style={{
                width: '48%',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 101,
                  alignItems: 'flex-start',
                  borderColor: '#FDE7E4',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                  elevation:5
                }}>
                <Image
                  style={imageStyle.premiumCalCardMenu}
                  source={require('../../assets/premium-calculator/travel.png')}
                />
                <Text style={textStyle.dashboardCardMenuText}>
                  Travel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <TouchableOpacity   activeOpacity={.9} onPress={() =>{ navigation.navigate('premiumCalculator'), Alert.alert('Information', 'Features not Enabled', [
                {
                  text: 'Okay',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'Okay',
                },
              ]);  }}
      
              style={{
                width: '48%',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 101,
                  borderColor: '#FDE7E4',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                  elevation:5
                }}>
                <Image
                  style={imageStyle.premiumCalCardMenu}
                  source={require('../../assets/premium-calculator/property-insurance.png')}
                />
                <Text style={textStyle.dashboardCardMenuText}>
                  Property Insurance
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity    activeOpacity={.9} onPress={() =>{ navigation.navigate('premiumCalculator'),
              Alert.alert('Information', 'Features not Enabled', [
                {
                  text: 'Okay',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'Okay',
                },
              ]);  
          }}
              style={{
                width: '48%',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 101,
                  borderColor: '#FDE7E4',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                  elevation:5
                }}>
                <Image
                  style={imageStyle.premiumCalCardMenu}
                  source={require('../../assets/premium-calculator/agriculture.png')}
                />
                <Text style={textStyle.dashboardCardMenuText}>
                  Agriculture
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <TouchableOpacity   activeOpacity={.9}  onPress={() =>{ navigation.navigate('premiumCalculator'), Alert.alert('Information', 'Features not Enabled', [
                {
                  text: 'Okay',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'Okay',
                },
              ]);  }}
              style={{
                width: '48%',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 101,
                  alignItems: 'flex-start',
                  borderColor: '#FDE7E4',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                  elevation:5
                }}>
                <Image
                  style={imageStyle.premiumCalCardMenu}
                  source={require('../../assets/premium-calculator/household.png')}
                />
                <Text style={textStyle.dashboardCardMenuText}>
                  Household
                </Text>
              </View>
            </TouchableOpacity>

           
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PremiumCalculator;



// import React, { useState, useEffect } from "react";
// import "./styles.css";

// const allImages = [
//   {
//     id: 1,
//     imgUrl: "https://via.placeholder.com/100"
//   },
//   {
//     id: 2,
//     imgUrl: "https://via.placeholder.com/100"
//   },
//   {
//     id: 3,
//     imgUrl: "https://via.placeholder.com/100"
//   }
// ];

// const App = () => {
//   const [pics, setPics] = useState([]);

//   const removeImage = (id) => {
//     // this is the line that you are looking for
//     setPics((oldState) => oldState.filter((item) => item.id !== id));
//   };

//   useEffect(() => {
//     //fake fetch data
//     setPics(allImages);
//   }, []);
//   return (
//     <div className="App">
//       {pics.map((pic) => {
//         return (
//           <div style={{ marginBottom: "100px" }}>
//             {pic.id}
//             <img
//               src={pic.imgUrl}
//               width="100px"
//               height="100px"
//               alt="placeholder grey 100px"
//             />
//             <button onClick={() => removeImage(pic.id)}>X</button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default App;
