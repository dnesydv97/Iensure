
import React from 'react';
import { Button, Text, SafeAreaView } from 'react-native';

import { EsewaSdk } from 'rn-all-nepal-payment';

const EsewaExample = () => {
  const [isVisible, setisVisible] = React.useState(false);
  const [response, setResponse] = React.useState('');

  const _onPaymentComplete = (response) => {
    setResponse(response);
    setisVisible(false);
    return
  }

  return (
    <SafeAreaView>
           <View style={{ backgroundColor: '#F57722',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',width:'40%'}}>
      <TouchableOpacity
                 
                  onPress={() => setisVisible(true)}>
                  <Text >Pay From Esewa</Text>
                </TouchableOpacity></View>
      {/* <Button
        title={'Esewa test'}
        onPress={() => setisVisible(true)}
        style={{ width: 100, height: 50, backgroundColor: 'red' }}
      /> */}
      {response?.token && <Text>{`ref id: ${response.token}`}</Text>}

      <EsewaSdk
        amt={100} // Amount of product or item or ticket etc
        taxAmt={5} // Tax amount on product or item or ticket etc
        totalAmt={105} // Total payment amount including tax, service and deliver charge. [i.e tAmt = amt + txAmt + psc + tAmt]
        env={'EPAYTEST'} // Merchant code provided by eSewa
        testMode={true} // Boolean value for enabling test endpoint and real payment gateway
        isVisible={isVisible} // Bool to show modal
        onPaymentComplete={_onPaymentComplete} //  Callback from connectips Web Sdk
        pid={"ee2c3ca1-696b-4cc5-a6be-2c40d929d43"} // A unique ID of product or item or ticket etc
        failureURL={`http://merchant.com.np/page/esewa_payment_failed?q=fu`} // Failure URL: a redirect URL of merchant application where customer will be redirected after FAILURE or PENDING transaction
        successURL={`http://merchant.com.np/page/esewa_payment_success?q=su`} // Success URL: a redirect URL of merchant application where customer will be redirected after SUCCESSFUL transaction
        psc={0} // Product service charge amount
        pdc={0} // Product delivery charge amount
      />
    </SafeAreaView>
  );
}

export default EsewaExample;




// import React, {useState} from 'react';
// import { Button, Text,View, SafeAreaView ,TouchableOpacity} from 'react-native';

// import { EsewaSdk } from 'rn-all-nepal-payment';
// import {useNavigation} from '@react-navigation/native';
// const EsewaExample = () => {
//   const navigation = useNavigation();
//   const [isVisible, setisVisible] = React.useState(false);
//   const [response, setResponse] = React.useState('');
//   const [esewakey, setEsewaKey] = React.useState('');
// console.log("response data", response)
// console.log("esewakey", esewakey)
//   const _onPaymentComplete = (response) => {
//     setResponse(response);
//     setisVisible(false);
//      navigation.navigate('PolicyMaking', {paramKey: response})
//     return
//   }

//     function refKey(keyLength) {
//       var i,
//         key = '',
//         characters =
//           'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//       var charactersLength = characters.length;
  
//       for (i = 0; i < keyLength; i++) {
//         key += characters.substr(
//           Math.floor(Math.random() * charactersLength + 1),
//           1,
//         );

//       }
  
//       return key;
//     }

//     console.log("refid generate",refKey(10))
//   return (
//     <SafeAreaView style={styles.container}>
//     <View style={{ backgroundColor: '#F57722',
//     borderRadius: 8,
//     paddingVertical: 13,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignContent: 'center',
//     justifyContent: 'center',width:'40%'}}>
//       <TouchableOpacity
                 
//                   onPress={() => setisVisible(true)}>
//                   <Text >Esewa Test</Text>
//                 </TouchableOpacity></View>
//       {response?.token && <Text>{`ref id: ${response.token}`}</Text>}
//       {response?.amount && <Text>{`Total Amount: ${response.amount}`}</Text>}
      

//       <EsewaSdk
//         amt={100} // Amount of product or item or ticket etc
//         taxAmt={5} // Tax amount on product or item or ticket etc
//         totalAmt={105} // Total payment amount including tax, service and deliver charge. [i.e tAmt = amt + txAmt + psc + tAmt]
//         env={'EPAYTEST'} // Merchant code provided by eSewa
//         testMode={true} // Boolean value for enabling test endpoint and real payment gateway
//         isVisible={isVisible} // Bool to show modal
//         onPaymentComplete={_onPaymentComplete} //  Callback from connectips Web Sdk
//         pid={2255} // A unique ID of product or item or ticket etc
//         failureURL={`http://merchant.com.np/page/esewa_payment_failed?q=fu`} // Failure URL: a redirect URL of merchant application where customer will be redirected after FAILURE or PENDING transaction
//         successURL={`https://webcrm.prime.com.np/esewa/success?q=su`} // Success URL: a redirect URL of merchant application where customer will be redirected after SUCCESSFUL transaction
//         psc={0} // Product service charge amount
//         pdc={0} // Product delivery charge amount
//       />
//     </SafeAreaView>
//   );
// }

// export default EsewaExample;

// const styles = {
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
 
// };
