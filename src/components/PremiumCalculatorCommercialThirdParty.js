import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import InputStyle from '../style/input';
import {TextInput} from 'react-native-paper';
import DropDown from '../module/react-native-paper-dropdown';

import {useSelector, useDispatch} from 'react-redux';

import {
  yearManufactureData,
  getCategoryList,
} from '../redux/actions/PremiumCalculatorFormAction';
import {isEmpty} from 'lodash';
const PremiumCalculatorCommercialThirdParty = ({


  setPayload,
  payload,
 
  vehicleCategory,
  setvehicleCategory,
  manufacturedYear,
  setmanufacturedYear,
  validvehiclecategory,
  validcubic,
  validmanuyear,
}) => {


  const [showDropDownVehicleCategory, setShowDropDownVehicleCategory] =
    useState(false);
  const [showDropDownManufacturedYear, setShowDropDownManufacturedYear] =
    useState(false);

    const dispatch = useDispatch();

    const {categorylist, year} = useSelector(
      state => state.PremiumCalculatorFormReducer,
    );
  
    useEffect(() => {
      dispatch(getCategoryList({ClassID: 22}));
    }, [getCategoryList]);
  
    useEffect(() => {
      dispatch(yearManufactureData({}));
    }, [yearManufactureData]);




  return (
    <SafeAreaView>
      <View>
        <View style={InputStyle.dropdown}>
          <DropDown
            label={'Vehicle Category'}
            mode={'outlined'}
            visible={showDropDownVehicleCategory}
            showDropDown={() => setShowDropDownVehicleCategory(true)}
            onDismiss={() => setShowDropDownVehicleCategory(false)}
            value={vehicleCategory}
            setValue={value => {
              setvehicleCategory(value);
              setPayload({...payload, CATEGORYID: value});
            }}
            list={
              !isEmpty(categorylist) &&
              categorylist?.map(list => ({
                label: list.CATEGORYNAME,
                value: list?.CATEGORYID,
              }))
            }
            dropdownStyle={{color: '#f57722'}}
            dropDownItemSelectedTextStyle={{color: '#F57722'}}
            header={1}
            error={validvehiclecategory ? true : false}
          />
        </View>

        <View style={InputStyle.dropdown}>
          <DropDown
            label={'Manufacturer year'}
            mode={'outlined'}
            visible={showDropDownManufacturedYear}
            showDropDown={() => setShowDropDownManufacturedYear(true)}
            onDismiss={() => setShowDropDownManufacturedYear(false)}
            value={manufacturedYear}
            setValue={value => {
              setmanufacturedYear(value);
              setPayload({...payload, YEARMANUFACTURE: value});
            }}
            list={
              !isEmpty(year) &&
              year?.map(list => ({
                label: list.Manu_Year,
                value: list?.Manu_Year,
              }))
            }
            dropdownStyle={{color: '#f57722'}}
            dropDownItemSelectedTextStyle={{color: '#F57722'}}
            header={1}
            error={validmanuyear ? true : false}
          />
        </View>

        <TextInput
          label="Cubic capacity (cc)"
          mode="outlined"
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          keyboardType="numeric"
          value={payload.CCHP}
          onChangeText={CCHP => setPayload({...payload, CCHP})}
          error={validcubic ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};


export default PremiumCalculatorCommercialThirdParty