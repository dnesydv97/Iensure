import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import InputStyle from '../style/input';
import {TextInput, RadioButton, Provider} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import propTypes from 'prop-types';
import {connect, useDispatch} from 'react-redux';
import {
  getExcessOwnDamage,
  yearManufactureData,
  getCompulsoryExcess,
  getCategoryList,
  year,
} from '../redux/actions/PremiumCalculatorFormAction';
import {isEmpty} from 'lodash';

const PremiumCalculatorFormCar = ({
  data,
  getExcessOwnDamage,
  yearManufactureData,
  setPayload,
  payload,
  getCompulsoryExcess,
  getCategoryList,
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
  setCompulsoryValue
}) => {
  const [showDropDownVehicleCategory, setShowDropDownVehicleCategory] =
    useState(false);
  const [showDropDownManufacturedYear, setShowDropDownManufacturedYear] =
    useState(false);
  const [showDropDownVolunteerExcess, setShowDropDownVolunteerExcess] =
    useState(false);

  const [test, setTest] = useState([]);
  const [category, setCategory] = useState([]);
  const [excess, setExcess] = useState([]);
  const [voluntary, setVoluntary] = useState([]);
  const [yearAge, setyearAge] = useState('');

  useEffect(() => {
    fetchMetaData();
  }, [vehicleCategory,manufacturedYear]);

  const fetchMetaData = async () => {
    getCategoryList({ClassID: 23});
    yearManufactureData({});
    getExcessOwnDamage({
      TYPECOVER: 'CM',
      VEHICLETYPE: 0,
      CATEGORYID: vehicleCategory,
     
    });

    getCompulsoryExcess({
      TYPECOVER: 'CM',
      CATEGORYID: vehicleCategory,
      YEARMANUFACTURE: manufacturedYear,
    });
  };

  useEffect(() => {
    if (test.length != 0) {
      if (
        manufacturedYear != test[0].value &&
        manufacturedYear != test[1].value &&
        manufacturedYear != test[2].value
      ) {
        setyearAge(3);
      } else if (
        manufacturedYear != test[0].value &&
        manufacturedYear != test[1].value
      ) {
        setyearAge(2);
      } else {
        setyearAge(1);
      }
    }
  }, [manufacturedYear]);
  useEffect(() => {
    if (!isEmpty(data)) {
      const getData = data;

      const categories = getData?.categorylist;

      let categoryLists = categories?.map((list, index) => ({
        label: list.CATEGORYNAME,
        value: list?.CATEGORYID,
      }));
      setCategory(categoryLists);
      const newDatas = getData.year;

      let fileLists = newDatas?.map((list, index) => ({
        label: list.Manu_Year,
        value: list.Manu_Year,
      }));
      setTest(fileLists);

      const exces = getData?.excess;

      let excessLists = exces?.map((list, index) => ({
        label: list.CompulsoryExcess,
        value: list?.CompulsoryExcess,
      }));
      setExcess(excessLists);

      const voluntaries = getData?.picker;

      let volunatarLists = voluntaries?.map((list, index) => ({
        label: list.TARIFF.toString(),
        value: list.TARIFF.toString(),
        // value: list?.ID,
      }));
      setVoluntary(volunatarLists);
    }
  }, [data]);

    useEffect(()=>{
      setPayload({...payload,"COD":data?.excess[0]?.CompulsoryExcess.toString() ?? 0})
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
          // selectedValue={payload.CATEGORYID}
          // onValueChange={CATEGORYID => setPayload({...payload, CATEGORYID})}
          setValue={value => {
            setvehicleCategory(value);
          }}
          list={category}
        
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
            label={'Manufacture year *'}
            mode={'outlined'}
            visible={showDropDownManufacturedYear}
            showDropDown={() => setShowDropDownManufacturedYear(true)}
            onDismiss={() => setShowDropDownManufacturedYear(false)}
            value={manufacturedYear}
            setValue={value => {
              setmanufacturedYear(value);
            }}
            list={test}
            dropdownStyle={{color: '#f57722'}}
            dropDownItemSelectedTextStyle={{color: '#F57722'}}
            header={1}
            error={validmanuyear ? true : false}
          />
        </View>
        <View style={(InputStyle.dropdown, {width: '47%'})}>
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
            list={voluntary}
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
          error={validcubic ? true : false}
        />
        <TextInput
          label="Compulsory Excess"
          mode="outlined"
          editable={false}
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={(InputStyle.textInput, {width: '47%', height: 44})}
          value={
            vehicleCategory ? data?.excess[0]?.CompulsoryExcess.toString() : '0'
          }
          // onChangeText={COD => setPayload({...payload, COD})}
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
        error={validcost ? true : false}
      />
      <TextInput
        // editable={false}
        label="No. of Passenger"
        mode="outlined"
        theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
        style={InputStyle.textInput}
        keyboardType="numeric"
        value={payload.NOOFPASSENGER}
        onChangeText={NOOFPASSENGER => setPayload({...payload, NOOFPASSENGER})}
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

PremiumCalculatorFormCar.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.PremiumCalculatorFormReducer,
});
export default connect(mapStatesToProps, {
  getExcessOwnDamage,
  yearManufactureData,
  getCategoryList,
  getCompulsoryExcess,
  year,
})(PremiumCalculatorFormCar);
