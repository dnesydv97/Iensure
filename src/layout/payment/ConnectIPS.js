import React from 'react';
import { Button, Text, SafeAreaView } from 'react-native';

import { CipsSdk } from 'rn-all-nepal-payment';

const CIPSExample = () => {
  const [isVisible, setisVisible] = React.useState(false);
  const [response, setResponse] = React.useState('');

  const _onPaymentComplete = (response) => {
    setResponse(response);
    setisVisible(false);
    return;
  };

  const CONFIG = {
    MERCHANTID: '1',
    APPID: 'MER-1-APP-1',
    APPNAME: 'RN Payment Test',
    TXNID: '120',
    TXNDATE: '02-08-2022',
    TXNAMT: '20000',
    REFID: 'REF-001',
    REMARKS: 'RMKS-001',
    PARTICULARS: 'PART-001',
    TOKEN:
      'mpqZ3kyEBjhiGKlYMv6OXe4kT8ID5gDr6wRdfd0hAcwlOcKrJn8WHFd5t7V2OCtZrKrEu0BbQeleQbA8kj766PT6J/7eakXFZURn1gedczCovBZq7Hz79lU5KQA58WSCv3sTs3mfY8Qspaz/VbUgHJKNK6thFeNdcs8rNWfXFlfJm9V84Wem2wNC5bjwzd8tZPVHa1BHiF+8eBgOEu8vhvs1tW6VUVbOr/U3ZOZNwaG3ZCL0GUnwF8qrmSoKexj6DDZLZOKB6xMsbTnQCu6i4nn2uGwSmAS3F3kUt5+cjmd4TLURFrYw0UKAXgKlU3tRanhAEN3dOpIisSRaBjwFHQ==',
  };

  return (
    <SafeAreaView>
      <Button
        title={'CIPS test'}
        onPress={() => setisVisible(true)}
        style={{ width: 100, height: 50, backgroundColor: 'red' }}
      />
      {response?.token && <Text>{`ref id: ${response.token}`}</Text>}

      <CipsSdk
        currency={'NPR'} // Default currency of choice
        appId={CONFIG.APPID} //  App id registered with connectips
        txnId={CONFIG.TXNID} // Transaction Id registered with connectips while creating token
        refId={CONFIG.REFID} // Refrence ID registered with connectips while creating token
        token={CONFIG.TOKEN} // Token generated from your private key.
        isVisible={isVisible} // Bool to show model
        txnAmt={CONFIG.TXNAMT} //  Number in paisa
        txnDate={CONFIG.TXNDATE} // Date of transaction
        appName={CONFIG.APPNAME} // Name of App registered with connectips
        remarks={CONFIG.REMARKS} // Remarks for transaction
        merchantId={CONFIG.MERCHANTID} // Merchant Id registered with connectips
        particulars={CONFIG.PARTICULARS} // Particulars for product
        onPaymentComplete={_onPaymentComplete} // Callback from connectips Web Sdk
        baseUrl={`https://login.connectips.com/retail/#/login`} // Base url provided by connectips
        successURL={`https://www.connectips.com/connectipsgw/failedpage`} // Success URL registered with connectips
        failureURL={`https://www.connectips.com/connectipsgw/successpage`} // Failure URL registered with connectips
      />
    </SafeAreaView>
  );
};

export default CIPSExample;