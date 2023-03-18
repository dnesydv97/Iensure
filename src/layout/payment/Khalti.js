import React from 'react';
import { Button, SafeAreaView,View,Text,TouchableOpacity } from 'react-native';

import { KhatiSdk } from 'rn-all-nepal-payment';

const KhaltiExample = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const _onPaymentComplete = (data) => {
    setIsVisible(false);
    const str = data.nativeEvent.data;
    const resp = JSON.parse(str);
    
    if (resp.event === 'CLOSED') {
     
    } else if (resp.event === 'SUCCESS') {
      
    } else if (resp.event === 'ERROR') {
      
    }
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: '#F57722',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',width:'40%'}}>
      <TouchableOpacity
                 
                  onPress={() => setIsVisible(true)}>
                  <Text >Pay From khalti</Text>
                </TouchableOpacity></View>
      <KhatiSdk
        amount={100} // Number in paisa
        isVisible={isVisible} // Bool to show model
        paymentPreference={[
          // Array of services needed from Khalti
          'KHALTI',
          'EBANKING',
          'MOBILE_BANKING',
          'CONNECT_IPS',
          'SCT',
        ]}
        productName={'Dragon'} // Name of product
        productIdentity={'1234567890'} // Unique product identifier at merchant
        onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
        productUrl={'http://gameofthrones.wikia.com/wiki/Dragons'} // Url of product
        publicKey={'test_public_key_dc74e0fd57cb46cd93832aee0a390234'} // Test or live public key which identifies the merchant
      />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default KhaltiExample;
