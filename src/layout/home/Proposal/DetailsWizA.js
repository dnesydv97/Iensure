import React, {useState, useEffect} from 'react';
import {List} from 'react-native-paper';
import {View, Text, ScrollView} from 'react-native';
import propTypes  from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {cloneDeep, groupBy, isEmpty} from 'lodash';
import accordionStyle from '../../../style/paypremium';

import {

  data,

  DetailsWizA,
  DetailsWizB,
} from '../../../redux/actions/ProposalAction';
const MyComponent = ({
  referencId,
  

  DetailsWizA,
  DetailsWizB,
}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const {wizA, wizB} = useSelector(state => state.ProposalReducer);
 
  
  useEffect(() => {
    details();
  }, []);

  const details = async () => {
    DetailsWizA({TOKENID: referencId});
  };
  useEffect(() => {
    detailswizB();
  }, []);

  const detailswizB = async () => {
    DetailsWizB({TOKENID: referencId});
  };


  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      
       
     
       
          {!isEmpty(wizA) &&
            wizA?.data?.map((data, i) => (
              <View style={{ marginTop: -10,
                marginBottom: 25,
                borderRadius: 8,
                padding: 5,
                backgroundColor: 'rgba(243, 243, 243, 1)',
    
                elevation: 5,}}>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Coverage
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.TYPECOVER == 'CM' ? (
                        <Text>First Party</Text>
                      ) : (
                        'Third Party'
                      )}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Vehicle Category
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.CATEGORYNAME}
                    </Text>
                  </View>
                </View>

                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Manufacture Year
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.YEARMANUFACTURE} AD
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Cubic Capacity
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.CCHP}
                    </Text>
                  </View>
                </View>

                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Vehicle Cost
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Rs.{' '}
                      {parseFloat(data.ESTCOST)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Voluntary Excess
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {parseFloat(data.EODAMT)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      No. of Discount Year
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.NCDYR} years
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      No. of Passenger
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.NOOFPASSENGER}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Exclude pool
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.EXCLUDE_POOL == '0'
                        ? '-'
                        : data.EXCLUDE_POOL == '1'
                        ? 'Yes'
                        : null}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Is Government
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.ISGOVERNMENT == '0'
                        ? '-'
                        : data.ISGOVERNMENT == '1'
                        ? 'Yes'
                        : null}
                    </Text>
                  </View>
                </View>

                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '43%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                    Payable Premium
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Rs.{' '}
                      {parseFloat(data.PayablePremium)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
      
       
          {!isEmpty(wizB) &&
            wizB?.data?.map((data, i) => (
              <View style={{ marginTop: -10, marginBottom: 50,
                borderRadius: 8,
                padding: 5,
                backgroundColor: 'rgba(243, 243, 243, 1)',
    
                elevation: 5,}}>
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
                      Manufacture Company
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.MAKEVEHICLE==null?'-':data.MAKEVEHICLE}
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

                <View style={accordionStyle.accordionContentSection}>
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
                      {data.OCCUPATION_DESC}
                    </Text>
                  </View>
                </View>
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
      
      </ScrollView>
    </View>
  );
};

MyComponent.propTypes  = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ProposalReducer,
});
export default connect(mapStatesToProps, {
  data,

  DetailsWizA,
  DetailsWizB,
})(MyComponent);
