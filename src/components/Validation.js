import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
const Validation = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        mode="outlined"
        value={value}
        selectionColor="green"
        theme={{colors: {primary: 'green', underlineColor: 'red'}}}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginLeft: 10,
    top: 5,
  },
  errorInput: {
    // borderColor: 'red',
    // borderWidth:1,
  },
});

export default Validation;
