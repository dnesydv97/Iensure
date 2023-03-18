import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {isEmpty} from 'lodash';
import {getBranch} from '../../redux/actions/BranchesAction';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../../style/branchstyle';
const MyComponent = () => {
  const {branch} = useSelector(state => state.BranchesReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
 
  useEffect(() => {
    if (!isEmpty(branch)) {
      setLoading(false);
      // setDataBranches(branch);
      setFilteredDataSource(branch);
      setMasterDataSource(branch);
    } else {
      setLoading(true);
    }
  }, [branch]);

  useEffect(() => {
    dispatch(getBranch({}));
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.DISTRICT
          ? item.DISTRICT.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Searchbar
        placeholder="Search branches "
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        style={{fontSize: 1}}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 100}}
        />
      ) : (
        <ScrollView>
          {!isEmpty(filteredDataSource) &&
            filteredDataSource?.map((value, i) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.province}>{value.PROVINCE}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.branch}>{value.BRANCHNAME} |</Text>
                    <Text style={styles.district}> {value.DISTRICT}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'rgba(196, 196, 196, 0.2)',
                    marginTop: 10,
                    marginHorizontal: -10,
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://i.ytimg.com/vi/VBbg6JY4Vfg/maxresdefault.jpg',
                    }}
                  />

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 4,
                        marginTop: 10,
                      }}>
                      <Image
                        source={require('../../assets/branches/call.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.details}>{value.TELNO}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 4}}>
                      <Image
                        source={require('../../assets/branches/phone.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.details}>023544033</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 4}}>
                      <Image
                        source={require('../../assets/branches/mail.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.details}>{value.EMAIL}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 4}}>
                      <Image
                        source={require('../../assets/branches/address.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.details}>{value.ADDRESS}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyComponent;
