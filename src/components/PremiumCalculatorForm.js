import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import InputStyle from '../style/input';
import {TextInput, RadioButton} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import {useDispatch, useSelector} from 'react-redux';

import {
  getExcessOwnDamage,
  yearManufactureData,
  getCompulsoryExcess,
  getCategoryList,
} from '../redux/actions/PremiumCalculatorFormAction';
import {isEmpty} from 'lodash';
const PremiumCalculatorForm = ({
  setPayload,
  payload,

  vehicleCategory,
  setvehicleCategory,
  manufacturedYear,
  setmanufacturedYear,
  volunteerExcess,
  setVolunteerExcess,
  checked,
  setChecked,
  validcubic,
  validcost,
  validvehiclecategory,
  validmanuyear,
  validVoluntary,
}) => {
  const [showDropDownVehicleCategory, setShowDropDownVehicleCategory] =
    useState(false);
  const [showDropDownManufacturedYear, setShowDropDownManufacturedYear] =
    useState(false);
  const [showDropDownVolunteerExcess, setShowDropDownVolunteerExcess] =
    useState(false);

  const [yearData, setYearData] = useState([]);
  const [category, setCategory] = useState([]);
  const [exce, setExcess] = useState([]);
  const [voluntary, setVoluntary] = useState([]);
  const [yearAge, setyearAge] = useState('');
  const [vehiclecatData, setVehicleCatData] = useState('');
  const dispatch = useDispatch();
  const {categorylist, year, excess, picker} = useSelector(
    state => state.PremiumCalculatorFormReducer,
  );

  useEffect(() => {
   if(!isEmpty(categorylist)){
    setVehicleCatData(categorylist)
   }
  }, [categorylist]);
 
  useEffect(() => {
    dispatch(getCategoryList({ClassID: 21}));
  }, [getCategoryList]);

  useEffect(() => {
    dispatch(yearManufactureData({}));
  }, [yearManufactureData]);

  useEffect(() => {
    dispatch(
      getExcessOwnDamage({
        TYPECOVER: 'CM',
        VEHICLETYPE: 0,
        CATEGORYID: vehicleCategory,
       
      }),
    );
  }, [getExcessOwnDamage,vehicleCategory]);

  useEffect(() => {
    dispatch(
      getCompulsoryExcess({
        TYPECOVER: 'CM',
        CATEGORYID: vehicleCategory,
        YEARMANUFACTURE: manufacturedYear,
      }),
    );
  }, [getCompulsoryExcess,manufacturedYear,vehicleCategory]);

  useEffect(() => {
    if (yearData.length != 0) {
      if (
        manufacturedYear != yearData[0].value &&
        manufacturedYear != yearData[1].value &&
        manufacturedYear != yearData[2].value
      ) {
        setyearAge(3);
      } else if (
        manufacturedYear != yearData[0].value &&
        manufacturedYear != yearData[1].value
      ) {
        setyearAge(2);
      } else {
        setyearAge(1);
      }
    }
  }, [manufacturedYear]);
  useEffect(() => {
     if (!isEmpty(year)) {
   

    const newDatas = year;
    let fileLists = newDatas?.map((list, index) => ({
      label: list.Manu_Year,
      value: list?.Manu_Year,
      // value: list?.ID,
    }));
    setYearData(fileLists);

     }
  }, [year]);
  useEffect(()=>{
    setPayload({...payload,"COD":excess[0]?.CompulsoryExcess.toString() ?? 0})
  },[excess])
  return (
    <SafeAreaView>
      <View style={InputStyle.dropdown}>
        <DropDown
          label={'Vehicle Category *'}
          mode={'outlined'}
          visible={showDropDownVehicleCategory}
          showDropDown={() => setShowDropDownVehicleCategory(true)}
          onDismiss={() => setShowDropDownVehicleCategory(false)}
          value={vehicleCategory}
          setValue={value => {
            setvehicleCategory(value);
          }}
          //  list={category}
           list={!isEmpty(vehiclecatData) && vehiclecatData?.map(list => ({
            label: list.CATEGORYNAME,
            value: list?.CATEGORYID,
          }))}

       
          dropDownItemSelectedTextStyle={{color: '#F57722'}}
          header={1}
          error={validvehiclecategory ? true : false}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          marginBottom: 10,
        }}>
        <View style={(InputStyle.dropdown, {width: '50%', marginRight: 10})}>
          <DropDown
          search={true}
        
            label={'Manufacture year *'}
            mode={'outlined'}
            visible={showDropDownManufacturedYear}
            showDropDown={() => setShowDropDownManufacturedYear(true)}
            onDismiss={() => setShowDropDownManufacturedYear(false)}
            value={manufacturedYear}
            setValue={setmanufacturedYear}
             list={yearData}

            // list={
            //   !isEmpty(year) &&
            //   year?.map((list, index) => ({
            //     label: list.Manu_Year,
            //     value: list?.Manu_Year,
            //   }))
            // }
            dropdownStyle={{borderColor: 'red', borderWidth: 2,alignSelf:'center'}}
            dropDownItemSelectedTextStyle={{color: '#F57722'}}
            header={1}
            error={validmanuyear ? true : false}
          />
        </View>
        <View style={(InputStyle.dropdown, {width: '47%',})}>
          <DropDown
            label={'Voluntary Excess *'}
            mode={'outlined'}
            visible={showDropDownVolunteerExcess}
            showDropDown={() => setShowDropDownVolunteerExcess(true)}
            onDismiss={() => setShowDropDownVolunteerExcess(false)}
            value={volunteerExcess}
            setValue={value => {
              setVolunteerExcess(value);
            }}
            // list={voluntary}
            list={
             !isEmpty(picker) && picker?.map((list, index) => ({
                label: list.TARIFF.toString(),
                value: list.TARIFF.toString()
               
              }))
            }
            dropdownStyle={{color: '#f57722'}}
            dropDownItemSelectedTextStyle={{color: '#F57722'}}
            header={1}
            error={validVoluntary ? true : false}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <TextInput
          label="Cubic capacity (cc) *"
          mode="outlined"
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={(InputStyle.textInput, {width: '50%', height: 44})}
          keyboardType="numeric"
          value={payload.CCHP}
          onChangeText={CCHP => setPayload({...payload, CCHP})}
          dense={true}
          error={validcubic ? true : false}
        />
        <TextInput
          label="Compulsory Excess"
          mode="outlined"
          editable={false}
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={(InputStyle.textInput, {width: '47%', height: 44})}
          value={vehicleCategory ? excess[0]?.CompulsoryExcess.toString() : '0'}
          // onChangeText={COD =>
          //   setPayload({...payload, COD})
          // }
          // disabled={true}
        />
      </View>
      <TextInput
        label="Vehicle Cost *"
        mode="outlined"
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        style={InputStyle.textInput}
        keyboardType="numeric"
        value={payload.EXPUTILITIESAMT}
        onChangeText={EXPUTILITIESAMT =>
          setPayload({...payload, EXPUTILITIESAMT})
        }
        dense={true}
        error={validcost ? true : false}
      />
      <TextInput
        editable={false}
        label="No. of Passenger"
        mode="outlined"
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        style={InputStyle.textInput}
        keyboardType="numeric"
        value={payload.NOOFPASSENGER}
        onChangeText={NOOFPASSENGER => setPayload({...payload, NOOFPASSENGER})}
        dense={true}
      />
      <Text style={{marginTop: 5}}>No claim discount</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton
          value={payload.NCDYR}
          onChangeText={NCDYR => setPayload({...payload, NCDYR})}
          status={checked === '0' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('0')}
          color={'#F57722'}
        />
        <Text>0 year (0%)</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton
          value={payload.NCDYR}
          onChangeText={NCDYR => setPayload({...payload, NCDYR})}
          status={checked === '1' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('1')}
          color={'#F57722'}
        />
        <Text>1 year (15%)</Text>
      </View>
      {yearAge >= 2 ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value={payload.NCDYR}
            onChangeText={NCDYR => setPayload({...payload, NCDYR})}
            status={checked === '2' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('2')}
            color={'#F57722'}
          />
          <Text>2 year (25%)</Text>
        </View>
      ) : null}
      {yearAge == 3 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <RadioButton
            value={payload.NCDYR}
            onChangeText={NCDYR => setPayload({...payload, NCDYR})}
            status={checked === '3' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('3')}
            color={'#F57722'}
          />
          <Text>3 or more year (35%)</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default PremiumCalculatorForm;
