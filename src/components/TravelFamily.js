import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import InputStyle from '../style/input';
import {TextInput} from 'react-native-paper';

import Checkbox from '@react-native-community/checkbox';

import moment from 'moment';
import Dateto from '../layout/travel-TMI/Date';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {isEmpty} from 'lodash';
import {Modal, Portal} from 'react-native-paper';

const TravelFamily = ({
  payload,
  setPayload,
  setDobTO,
  dateto,
  // annualtrip,
  // setAnnualTrip,
}) => {
  const age = moment().diff(dateto, 'years');

  const [visible, setVisible] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [formData, setFormData] = useState([]);

  const addElementToArray = () => {
    setFormData(prev => [...prev, payload]);
    hideModal();
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <View>
        <View>
          <TouchableOpacity
            // onPress={() => setShouldShow(!shouldShow)}
            onPress={showModal}>
            <View
              style={{
                backgroundColor: '#F57722',
                borderRadius: 4,
                height: 40,
                paddingVertical: 8,

                marginTop: 6,
                width: 75,
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontWeight: '500',

                  textAlign: 'center',
                }}>
                Add
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {visible == false ? (
          <View>
            {!isEmpty(formData) &&
              formData?.map((data, i) => (
                <View
                  style={{
                    backgroundColor: '#DEDEDE',
                    borderRadius: 10,
                    width: '100%',
                    padding: 20,
                    marginTop: 10,
                  }}>
                  {/* {payload.NAME ? <Text>Name : {payload.NAME}</Text> : null}
            {payload.PASSPORT ? (
              <Text>Passport : {payload.PASSPORT}</Text>
            ) : null}
            {dateto ? <Text>Date of Birth : {dateto}</Text> : null}
            {payload.RELATION ? (
              <Text>Relation : {payload.RELATION}</Text>
            ) : null} */}

                  <View>
                    <Text>Name : {data.NAME}</Text>
                    <Text>Passport : {data.PASSPORT}</Text>
                    <Text>Relation : {data.RELATION}</Text>
                  </View>

                  <TouchableOpacity onPress={showModal}>
                    <View
                      style={{
                        backgroundColor: '#F57722',
                        borderRadius: 4,
                        height: 30,
                        paddingVertical: 4,
                        marginTop: 6,
                        width: 75,
                        alignSelf: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#fff',
                          fontWeight: '500',

                          textAlign: 'center',
                        }}>
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        ) : null}
        <Portal>
          <Modal
            visible={visible}
            // onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: '#fff',
              padding: 10,
              marginTop: -150,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 6,
            }}>
            <View
              style={{
                borderColor: '#FE5800',
                borderWidth: 1,
                borderRadius: 6,
                backgroundColor: '#F1F0F0',
                margin: 8,
                padding: 10,
              }}>
              <TextInput
                label="Name"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                keyboardType="default"
                value={payload.NAME}
                onChangeText={NAME => setPayload({...payload, NAME})}
              />
              <TextInput
                label="Passport Number"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                keyboardType="default"
                value={payload.PASSPORT}
                onChangeText={PASSPORT => setPayload({...payload, PASSPORT})}
              />
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 4,
                  justifyContent: 'space-between',
                }}>
                <Dateto setDobTO={setDobTO} dateto={dateto} />
                <View
                  style={{
                    backgroundColor: '#F57722',
                    borderRadius: 4,
                    height: 46,
                    paddingVertical: 8,
                    marginTop: 6,
                    width: 75,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      fontWeight: '500',

                      textAlign: 'center',
                    }}>
                    age {age == age ? age : '0'}
                  </Text>
                </View>
              </View>
              <TextInput
                label="Relation"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                keyboardType="name-phone-pad"
                value={payload.RELATION}
                onChangeText={RELATION => setPayload({...payload, RELATION})}
              />
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  // value={payload.EXCLUDE_POOL}
                  // onValueChange={EXCLUDE_POOL =>
                  //   setPayload({...payload, EXCLUDE_POOL})
                  // }
                  value={annualtrip}
                  onValueChange={setAnnualTrip}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                />
                <Text>Is Annual Trip</Text>
              </View> */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={addElementToArray}>
                  <View
                    style={{
                      backgroundColor: '#F57722',
                      borderRadius: 4,
                      height: 40,
                      paddingVertical: 8,
                      marginTop: 6,
                      width: 100,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        fontWeight: '500',

                        textAlign: 'center',
                      }}>
                      Save
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#F57722',
                    borderRadius: 4,
                    height: 40,
                    paddingVertical: 8,
                    marginTop: 6,
                    width: 100,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      fontWeight: '500',

                      textAlign: 'center',
                    }}>
                    Delete
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

export default TravelFamily;

// import React, {useState, useEffect} from 'react';
// import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
// import InputStyle from '../style/input';
// import {TextInput} from 'react-native-paper';
// // import DropDown from '../module/react-native-paper-dropdown';
// import Checkbox from '@react-native-community/checkbox';
// import moment from 'moment';
// import Dateto from '../layout/travel-TMI/Date';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// const TravelFamily = ({payload, setPayload, setDobTO, dateto,annualtrip, setAnnualTrip}) => {
//   const age = moment().diff(dateto, 'years');
//   const [shouldShow, setShouldShow] = useState(false);
//   return (
//     <SafeAreaView>
//       <View>

//         <View>
//           <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
//             <View
//               style={{
//                 backgroundColor: '#F57722',
//                 borderRadius: 4,
//                 height: 40,
//                 paddingVertical: 8,
//                 marginRight: 15,
//                 marginTop: 6,
//                 width: 75,
//                 alignSelf: 'flex-end',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 15,
//                   color: '#fff',
//                   fontWeight: '500',

//                   textAlign: 'center',
//                 }}>
//                 Add
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
// {shouldShow ? (
//         <View
//           style={{
//             borderColor: '#FE5800',
//             borderWidth: 1,
//             borderRadius: 6,
//             backgroundColor: '#F1F0F0',
//             margin: 8,
//             padding: 10,
//           }}>
//           <TextInput
//             label="Name"
//             mode="outlined"
//             theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//             style={InputStyle.textInput}
//             keyboardType="default"
//             value={payload.Name}
//             onChangeText={NAME => setPayload({...payload, NAME})}
//           />
//           <TextInput
//             label="Passport Number"
//             mode="outlined"
//             theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//             style={InputStyle.textInput}
//             keyboardType="default"
//             value={payload.PASSPORT}
//             onChangeText={PASSPORT => setPayload({...payload, PASSPORT})}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               borderRadius: 4,
//               justifyContent: 'space-between',
//             }}>
//             <Dateto setDobTO={setDobTO} dateto={dateto} />
//             <View
//               style={{
//                 backgroundColor: '#F57722',
//                 borderRadius: 4,
//                 height: 46,
//                 paddingVertical: 8,
//                 marginTop: 6,
//                 width: 75,
//               }}>
//               <Text
//                 style={{
//                   fontSize: 15,
//                   color: '#fff',
//                   fontWeight: '500',

//                   textAlign: 'center',
//                 }}>
//                 age {age == age ? age : '0'}
//               </Text>
//             </View>
//           </View>
//           <TextInput
//             label="Relation"
//             mode="outlined"
//             theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//             style={InputStyle.textInput}
//             keyboardType="name-phone-pad"
//             value={payload.RELATION}
//             onChangeText={RELATION => setPayload({...payload, RELATION})}
//           />
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                 <Checkbox
//                   // value={payload.EXCLUDE_POOL}
//                   // onValueChange={EXCLUDE_POOL =>
//                   //   setPayload({...payload, EXCLUDE_POOL})
//                   // }
//                   value={annualtrip}
//                   onValueChange={setAnnualTrip}
//                   tintColors={{true: '#F57722', false: '#C7C7CC'}}
//                 />
//                 <Text>Is Annual Trip</Text>
//               </View>
//         </View>
//  ) : null
// }
//       </View>
//     </SafeAreaView>
//   );
// };

// export default TravelFamily;
