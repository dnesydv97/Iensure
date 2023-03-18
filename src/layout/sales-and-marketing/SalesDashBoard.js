import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {isEmpty} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { getFoList } from '../../redux/actions/SalesAndMarketingAction';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
   
    if(isEmpty(user)) {
      navigation.navigate('Login');
    }
  }, []);

    useEffect(() => {
    fetchfoList();
  }, []);

  const fetchfoList = async () => {
    dispatch(getFoList({
      // DateFrom: '2001/11/23',
      // DateTo: '2021/11/23',
      // Key: 'FO',
      // PageNumber: 1,
      // PageSize: 50,
      DateFrom: '2021-01-01',
      DateTo: '2022-01-31',
      Key: 'FO',
      BusinessType: 1,
      fiscalid: 10,
      PageNumber: 1,
      PageSize: 10,
    }));
  };


  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5' ,margin:20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{fontWeight: '500', fontSize: 24, lineHeight: 28.13,marginBottom:10}}>
        Marketing
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('NetpremiumGrossClaim')}>
      <View style={styles.background}>
        <Image
          source={require('../../assets/claimpaidsummary.png')}
          style={{width: 36, height: 36}}
        />
        <Text style={styles.text}>Net Premium & Gross Claim Settlement</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => navigation.navigate('ClaimOutStanding')}>
      <View style={styles.background}>
        <Image
          source={require('../../assets/netpremium.png')}
          style={{width: 36, height: 36}}
        />
        <Text style={styles.text}>Claim Outstanding Summary</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ClaimPaidHome')}>
      <View style={styles.background}>
        <Image
          source={require('../../assets/claimsummary.png')}
          style={{width: 36, height: 36}}
        />
        <Text style={styles.text}>Claim Paid Summary</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => navigation.navigate('FieldOfficerList')}>
      <View style={styles.background}>
        <Image
          source={require('../../assets/fieldofficer.png')}
          style={{width: 36, height: 36}}
        />
        <Text style={styles.text}>Field Officer</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity
           onPress={() => navigation.navigate('PortfolioSummary')}>
      <View style={styles.background}>
        <Image
          source={require('../../assets/portfoliosummary.png')}
          style={{width: 36, height: 36}}
        />
        <Text style={styles.text}>Portfolio Summary</Text>
      </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;


const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    alignItems: 'center',
  // margin:10,
     padding: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 101,
    borderColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 7,
     marginTop: 16,
   
  },
 
  text: {
    width:'70%',
    fontSize: 16,
    color: '#686868',
    fontStyle: 'normal',
    marginLeft: 16,
    color: '#000000',
    lineHeight: 21.79,
  
   
    fontFamily: ['Open Sans'][600],
  },
});

// import React, {useState} from 'react';
// import {
//   Text,
//   View,
//   Button,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const HomeScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={{flex: 1, backgroundColor: '#FAFAFA', padding: 20}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('NetpremiumGrossClaim')}>
//           <View style={styles.background}>
//           <Text style={styles.text}>
//               Net Premium & Gross Claim Settlement
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('ClaimOutStanding')}>
//           <View style={{marginLeft: 15}}>
//             <View style={styles.background}>
//             <Text style={styles.text}>
//                 Claim Outstanding Summary
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('ClaimPaidHome')}>
//           <View style={{marginLeft: 15}}>
//             <View style={styles.background}>
//             <Text style={styles.text}>
//                 Claim Paid Summary
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-around',
//             marginTop: 10,
//           }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('FieldOfficerList')}>
//             <View>
//               <View style={styles.background}>
//               <Text style={styles.text}>
//                   Field Officer
//                 </Text>
//               </View>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => navigation.navigate('PortfolioSummary')}>
//             <View style={{marginLeft: 15}}>
//               <View style={styles.background}>
//                 <Text style={styles.text}>
//                   Portfolio Summary
//                 </Text>
//               </View>
//             </View>
//           </TouchableOpacity>

//           <View style={{marginLeft: 15}}>
//             <View
//               style={{
//                 backgroundColor: '#FAFAFA',
//                 width: 109,
//                 height: 101,
//                 overflow: 'hidden',
//               }}>
//               <Text>{''}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
// export default HomeScreen;

// const styles = StyleSheet.create({
//   background: {
//      backgroundColor: '#fff',
//     width: 109,
//     height: 101,
//      borderColor: '#FDE7E4',
//     borderWidth: 0.5,
//     borderRadius: 7,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//     elevation: 10,
//     textShadowColor:'red'

//     // shadowColor: '#000',
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.5,
//     // shadowRadius: 2,
//     // elevation: 2,
//   },
//   text:{

//       fontSize: 13,
//       color: '#686868',
//       fontStyle: 'normal',
//       marginTop: 25,
//       fontWeight: '500',
//       lineHeight: 16,
//       alignSelf: 'center',
//       textAlign: 'center',
//       padding:1,
//       fontFamily:'Open Sans'

//   }
// });
