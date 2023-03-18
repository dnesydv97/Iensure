import {ScrollView, View, TouchableOpacity} from 'react-native';
import {
  Checkbox,
  Divider,
  Menu,
  TextInput,
  TouchableRipple,
  useTheme,
  Searchbar 
} from 'react-native-paper';
import React, {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from 'react';
import {isEmpty} from 'lodash';
import propTypes from 'prop-types';
import input from '../../../style/input';
const DropDown = forwardRef((props, ref) => {
  const activeTheme = useTheme();
  const {
    multiSelect = false,
    visible,
    onDismiss,
    showDropDown,
    value,
    setValue,
    activeColor,
    mode,
    label,
    error,
    placeholder,
    inputProps,
    list,
    dropDownContainerMaxHeight,
    dropDownContainerHeight,
    theme,
    dropDownStyle,
    dropDownItemStyle,
    dropDownItemSelectedStyle,
    dropDownItemTextStyle,
    dropDownItemSelectedTextStyle,
    accessibilityLabel,
    header,
    search
  } = props;
  const [displayValue, setDisplayValue] = useState('');
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [selectList,setSelectList] = useState({})
  const [searchQuery,setSearchQuery] = useState('')
  const onLayout = event => {
    if (header == 2) {
      event.nativeEvent.layout.height = 0;
      setInputLayout(event.nativeEvent.layout);
    } else if (header == 1) {
      event.nativeEvent.layout.height = -52;
      setInputLayout(event.nativeEvent.layout);
    } else {
      setInputLayout(event.nativeEvent.layout);
    }
  };
  useEffect(() => {
    if (multiSelect) {
      const _labels = list
        .filter(_ => value.indexOf(_.value) !== -1)
        .map(_ => _.label)
        .join(', ');
      setDisplayValue(_labels);
    } else {
      const _label = !isEmpty(list) && list.find(_ => _.value === value)?.label;
      if (_label) {
        setDisplayValue(_label);
      }
    }
  }, [list, value]);
  const isActive = useCallback(
    currentValue => {
      if (multiSelect) {
        return value.indexOf(currentValue) !== -1;
      } else {
        return value === currentValue;
      }
    },
    [value],
  );
  const setActive = useCallback(
    currentValue => {
      if (multiSelect) {
        const valueIndex = value.indexOf(currentValue);
        const values = value.split(',');
        if (valueIndex === -1) {
          setValue([...values, currentValue].join(','));
        } else {
          setValue(
            [...values].filter(value => value !== currentValue).join(','),
          );
        }
      } else {
        setValue(currentValue);
      }
    },
    [value],
  );

  useEffect(()=>{
    setSelectList(list)
  },[list])
  const onChangeSearch = (value) =>{
     setSearchQuery(value)

     const filter=list.filter(item=>{
        return item?.label?.toLowerCase()?.includes(value?.toLowerCase())
     })
     console.log(filter,'filter')
     setSelectList(filter)
  }


  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      theme={theme}
      anchor={
        <TouchableOpacity
          style={{color: '#F57722'}}
          ref={ref}
          onPress={showDropDown}
          onLayout={onLayout}
          accessibilityLabel={accessibilityLabel}>
          <View pointerEvents={'none'}>
            <TextInput
              style={{height: 44}}
              value={displayValue}
              mode={mode}
              label={label}
              error={error}
              placeholder={placeholder}
              // pointerEvents={'none'}
              theme={theme}
              right={
                <TextInput.Icon
                  style={{marginTop: 15}}
                  name={visible ? 'menu-up' : 'menu-down'}
                />
              }
              {...inputProps}
            />
          </View>
        </TouchableOpacity>
      }
      style={{
        maxWidth: inputLayout?.width,
        width: inputLayout?.width,
        marginTop: inputLayout?.height,
        ...dropDownStyle,
      }}>
      <ScrollView
        bounces={false}
        style={{
          ...(dropDownContainerHeight
            ? {
                height: dropDownContainerHeight,
              }
            : {
                maxHeight: dropDownContainerMaxHeight || 200,
              }),
        }}>
       {
        search &&  <View style={{padding:15}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          
        />
      </View>
       }
        {!isEmpty(selectList) &&
          selectList?.map((_item, _index) => (
            <Fragment key={_item.value}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setActive(_item.value);
                  if (onDismiss) {
                    onDismiss();
                  }
                }}>
                <Fragment>
                  <Menu.Item
                    titleStyle={{
                      color: isActive(_item.value)
                        ? activeColor || (theme || activeTheme).colors.primary
                        : (theme || activeTheme).colors.text,
                      ...(isActive(_item.value)
                        ? dropDownItemSelectedTextStyle
                        : dropDownItemTextStyle),
                    }}
                    title={_item.custom || _item.label}
                    style={{
                      flex: 1,
                      maxWidth: inputLayout?.width,
                      ...(isActive(_item.value)
                        ? dropDownItemSelectedStyle
                        : dropDownItemStyle),
                    }}
                  />
                  {multiSelect && (
                    <Checkbox.Android
                      theme={{
                        colors: {accent: activeTheme?.colors.primary},
                      }}
                      status={isActive(_item.value) ? 'checked' : 'unchecked'}
                      onPress={() => setActive(_item.value)}
                    />
                  )}
                </Fragment>
              </TouchableOpacity>
              <Divider />
            </Fragment>
          ))}
      </ScrollView>
    </Menu>
  );
});
DropDown.propTypes = {
  dropDownStyle: {
    marginTop: 52,
  },
};
export default DropDown;
