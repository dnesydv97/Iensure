import React, {useState, useEffect} from 'react';

import {View, Text, ScrollView, TouchableOpacity,ActivityIndicator} from 'react-native';
import propTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {cloneDeep, groupBy, isEmpty} from 'lodash';
import accordionStyle from '../../style/paypremium';
import {useNavigation} from '@react-navigation/native';
import {
  data,

  DetailsWizB,
} from '../../redux/actions/ProposalAction';
const VehicleDetails = ({ DetailsWizB,route}) => {
  const [expanded, setExpanded] = React.useState(true);
  const navigation = useNavigation();
  const handlePress = () => setExpanded(!expanded);
  const {wizB} = useSelector(state => state.ProposalReducer);
  const [usewizB, setUseWizB] =useState('')
  const [loading, setLoading] = useState(true);
const tokenid = route?.params?.tokenKey
  
  useEffect(() => {
    detailswizB();
  }, []);

  const detailswizB = async () => {
    DetailsWizB({TOKENID: tokenid});
  };
  useEffect(()=>{
    if(!isEmpty(wizB)){
      setLoading(false);
      setUseWizB(wizB)
    }
    else {
      setLoading(true);
    }
   
  },[wizB])
  

  return (
    <View style={{backgroundColor: '#fff', flex: 1,padding:10}}>
     <ScrollView showsVerticalScrollIndicator={false}>
          
     {loading ? 
            <ActivityIndicator
              size="large"
              color="#F57722"
              style={{marginTop: 300,justifyContent: 'center',
                alignItems: 'center',flex:1}}
            />
          : 
          <View>
       {!isEmpty(usewizB) &&
          usewizB?.data?.map((data, i) => (
            <View style={{ marginTop: -10,
              marginBottom: 25,
              borderRadius: 8,
              padding: 5,
              backgroundColor: 'rgba(243, 243, 243, 1)',
  
              elevation: 5,marginTop:-10}}>
             

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Vehicle No.
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.EVEHICLENO}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Engine No.
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.ENGINENO}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Chasis No.
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.CHASISNO}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Manufacture 
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.MAKEVEHICLE}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Model
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.MODEL}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Formation
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.NAMEOFVEHICLE}
                  </Text>
                </View>
              </View>
             
             {/* <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Occuption
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.BUSSOCCPCODE}
                  </Text>
                </View>
              </View> */}
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Mode Use
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.MODEUSE}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '43%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                   Registration
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {data.REGDATE}
                  </Text>
                </View>
              </View>
            </View>
          ))} 
         
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#F57722',
              borderRadius: 5,
              padding: 10,
              // alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 10,
              width: '100%',
              // marginLeft: 40,
            }}
            onPress={() => navigation.navigate('Proposal')}>
            <Text style={{color: 'white', fontSize: 15}}>Submit to underwritting</Text>
          </TouchableOpacity>
        </View>
        </View>
}

        {/* <View>
          <TouchableOpacity
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                borderColor: 'rgba(0, 0, 0, 0.25)',
                padding: 10,
                borderWidth: 1,
                // alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
    
                marginBottom: 30,
                width: '100%',
            }}
            onPress={() => navigation.navigate('BikeCalculator')}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.6)',
              lineHeight: 19.5,
              fontSize: 16,
              fontWeight: '400',
              fontFamily: 'Montserrat',}}>Edit</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView> 
     
    </View>
  );
};

VehicleDetails.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ProposalReducer,
});
export default connect(mapStatesToProps, {
  data,

 
  DetailsWizB,
})(VehicleDetails);
