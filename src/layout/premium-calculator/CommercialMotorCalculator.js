import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import PremiumCalculatorForm from '../../components/PremiumCalculatorForm';
import {TextInput, Provider, RadioButton} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

const CommercialMotorCalculator = () => {
  const [isSelectedCB1, setSelectionCB1] = useState(false);
  const [isSelectedCB2, setSelectionCB2] = useState(false);
  const [isSelectedCB3, setSelectionCB3] = useState(false);
  const [isSelectedCB4, setSelectionCB4] = useState(false);
  return (
    <Provider>
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <PremiumCalculatorForm />
            </View>
            <View style={{marginBottom: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  value={isSelectedCB1}
                  onValueChange={setSelectionCB1}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                />
                <Text>Include Towing Charge</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  value={isSelectedCB2}
                  onValueChange={setSelectionCB2}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                />
                <Text>Exclude RST/MD Pool</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  value={isSelectedCB3}
                  onValueChange={setSelectionCB3}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                />
                <Text>Is government Vehicle!</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  value={isSelectedCB4}
                  onValueChange={setSelectionCB4}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                />
                <Text>Has Agent</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={buttonStyle.login}>
                <Text style={textStyle.loginText}>Calculate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default CommercialMotorCalculator;
