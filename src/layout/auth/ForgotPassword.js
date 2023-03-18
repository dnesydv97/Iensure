
import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,ActivityIndicator
} from 'react-native';

import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import inputStyle from '../../style/input';
import {TextInput} from 'react-native-paper';
import {getNewPassword} from '../../redux/actions/AuthAction';
import Logo from './Logo';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
const ForgotPassword = () => {
  const {forgetPass} = useSelector(state => state.BranchesReducer);
  const {loadingResource} = useSelector(state => state.auth);
  
  const [passwordResponse,setPasswordResponse] = useState('')
  const [payload, setPayload] = useState({
    UserId: '',
  });
  const [emailValid, setEmailValid] = useState(false);
 const navigation= useNavigation()
  
  const dispatch = useDispatch();
  useEffect(() => {
 
    if (!isEmpty(payload.UserId)) {
      setEmailValid(false);
    }
  }, [payload.UserId]);
  const handleSubmit = async () => {
    let body = {
      ...payload,
    };

    if (isEmpty(payload.UserId)) {
      setEmailValid(true);
      return;
    }
    dispatch(getNewPassword(body));
   
    
  };
  useEffect(() =>{
    if(!isEmpty(forgetPass)){
      setPasswordResponse(forgetPass)
    }
    },[forgetPass])
useEffect(() =>{
if(!isEmpty(passwordResponse) && passwordResponse?.response_code==0){
  navigation.navigate('ForgetPasswordVerification' ,{userid:payload.UserId, UserData:passwordResponse.data});
}
},[passwordResponse])

 
  
  return (
    <View style={containerStyle.RegisterContainer}>
  
        <View style={{padding: 30,marginTop:20}}>
          <View style={{alignItems: 'center', }}>
            <Text
              style={{
                fontSize: 20,
                color: '#686868',
             
                fontWeight: '600',
              }}>
              IEnsure
            </Text>
           <Logo/>
          </View>
         <View style={{marginTop:60}}>
            <View>
              <TextInput
                label="Email/PhoneNumber"
                mode="outlined"
                textAlignVertical="top"
                style={inputStyle.textInput}
                placeholder="Enter registered Email / Phone"
                value={payload.UserId}
                onChangeText={UserId => setPayload({...payload, UserId})}
                error={emailValid?true:false}
              />
            </View>
            {!isEmpty(passwordResponse) && passwordResponse?.response_code==1 &&
            <Text style={{marginLeft:6,color:"red"}}>{passwordResponse?.response_description}</Text>}
           
        

          <View style={{marginTop:10}}>
            <TouchableOpacity style={buttonStyle.loginchange} onPress={handleSubmit}>
              <Text style={textStyle.loginText}>Next</Text>
              <ActivityIndicator animating={loadingResource} style={{marginTop:-17}} />
            </TouchableOpacity>
          </View>
          {!isEmpty(passwordResponse) && passwordResponse?.response_code==1 &&
          <View style={{marginTop:10}}>
            <TouchableOpacity style={buttonStyle.loginchange} onPress={()=> navigation.navigate('Register')}>
              <Text style={textStyle.loginText}>Register</Text>
              <ActivityIndicator animating={loadingResource} style={{marginTop:-17}} />
            </TouchableOpacity>
          </View>
}
          </View>
        </View>
      
    </View>
  );
};

export default ForgotPassword;
