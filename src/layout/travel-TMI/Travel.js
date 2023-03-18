import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView,Modal,Pressable,StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import {Provider, DefaultTheme} from 'react-native-paper';
import TravelForm from '../../components/TravelForm';
import moment from 'moment';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
const Travel = () => {
  const navigation = useNavigation();
  const [cover, setCover] = useState('');
  const [area, setArea] = useState('');
  const [packagetype, setPackage] = useState('');
  const [place, setPlace] = useState('');
  const [isVatable, setIsVatable] = useState('');
  const Annual = isVatable ? 1 : 0;
  
  const [datefrom, setDateFrom] = useState('');
  const [dateto, setDateTO] = useState('');
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const day = moment(dateto).diff(datefrom, 'days');
  const [validCover, setValidCover] = useState(false);
  const [validArea, setValidArea] = useState(false);
  const [validPackage, setValidpackage] = useState(false);
  const [validDateFrom, setValidDateForm] = useState(false);
  const [validDateTo, setValidDateTO] = useState(false);
  useEffect(() => {
    if (cover) {
      setValidCover(false);
    }
  }, [cover]);
  useEffect(() => {
    if (area) {
      setValidArea(false);
    }
  }, [area]);
  useEffect(() => {
    if (packagetype) {
      setValidpackage(false);
    }
  }, [packagetype]);
  useEffect(() => {
    if (datefrom) {
      setValidDateForm(false);
    }
  }, [datefrom]);
  useEffect(() => {
    if (dateto) {
      setValidDateTO(false);
    }
  }, [dateto]);
  const HanldeSubmit =async () => {
    let body = {
      COVERTYPE: cover,
      PLAN: area,
      PACKAGE: packagetype,
      DAYS: day,
      PLACE: place,
      DateTo: dateto,
      DateFrom: datefrom,
      // ISVATABLE: Annual,
    };

    navigation.navigate('TravelSecond', {body});
   
  };
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  const detailsData =()=>{
    setDetailsModalVisible(true)
   }
  return (
   
    <Provider theme={theme}>
      
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <TravelForm
                cover={cover}
                setCover={setCover}
                area={area}
                setArea={setArea}
                packagetype={packagetype}
                setPackage={setPackage}
                place={place}
                setPlace={setPlace}
                datefrom={datefrom}
                setDateFrom={setDateFrom}
                dateto={dateto}
                setDateTO={setDateTO}
                validCover={validCover}
                validArea={validArea}
                validPackage={validPackage}
                validDateFrom={validDateFrom}
                validDateTo={validDateTo}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{marginLeft: 8, color: 'grey'}}>Number of days</Text>
              <View
                style={{
                  backgroundColor: '#F57722',
                  borderRadius: 4,
                  height: 25,

                  marginLeft: 50,
                  width: 75,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#fff',
                    fontWeight: '500',

                    textAlign: 'center',
                  }}>
                  {day == day ? day : '0'}
                </Text>
              </View>
            </View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                value={isVatable}
                onValueChange={setIsVatable}
                tintColors={{true: '#F57722', false: '#C7C7CC'}}
              />
              <Text>Is Vatable</Text>
            </View> */}
 <TouchableOpacity onPress={detailsData}>
              <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:15}}>
                <Icons name='information-circle-outline' size={25} style={{marginRight:3}}/>
                <Text>View the functionality of the fileds(सोधपुछ)</Text>
              </View>
              </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={buttonStyle.login}
                onPress={() =>{
                  if (!cover) {
                    setValidCover(true);
                  }
                  if(!area){
                    setValidArea(true);
                  }
                  if(!packagetype){
                    setValidpackage(true);
                  }
                  if(!datefrom){
                    setValidDateForm(true);
                  }
                  if(!dateto){
                    setValidDateTO(true);
                  }
                  if(!cover|| !area|| !packagetype || !datefrom|| !dateto <0)
                  {
                    return;
                  }

                  HanldeSubmit()}}>
                <Text style={textStyle.loginText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
          // animationType={'fade'}
          
          transparent={true}
          visible={detailsModalVisible}
          onRequestClose={() => {
            setDetailsModalVisible(!detailsModalVisible);
          }}>
          <View style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)',  justifyContent: "center",
                alignItems: "center",}}>
            <View
              style={{
                height: '40%',
                width: '93.2%',
                // position: 'absolute',
                // bottom: 0,
              
              }}>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#fff',
                  height: '100%',
                  borderRadius: 10,
                  borderTopColor: '#C7C7CC',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C7C7CC',
                    paddingVertical: 6,
                    margin: 6,
                  }}>
                  <Text style={{fontWeight: '500', fontSize: 15}}>
                    Details Information
                  </Text>
                  <Pressable
                    onPress={() =>
                      setDetailsModalVisible(!detailsModalVisible)
                    }>
                    <View
                      style={{
                        // backgroundColor: '#C7C7CC',
                        borderRadius: 1000,
                        padding: 5,
                      }}>
                      <Icon name="close" size={20} color="#9393AA" />
                    </View>
                  </Pressable>
                </View>

                <View style={{padding:20}}>
                 
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>
                     Cover Type
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                        
                       you can select Cover Type
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>Plans and Area</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                      Slects plans and Area
                       
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>
                      Package Type
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                        select Package Type
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>
                      Total Days
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                      selct total days of tour
                      
                      </Text>
                    </View>
                 
                  
                
                </View>
              </View>
            </View>
          </View>
        </Modal>
        </KeyboardAwareScrollView>
      </SafeAreaView>
     
    </Provider>
   
  );
};
export default Travel;
