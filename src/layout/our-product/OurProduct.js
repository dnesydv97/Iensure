


import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {isEmpty} from 'lodash';
import {
  getProduct,

  data,
} from '../../redux/actions/OurProductAction';
import propTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';

const Product = ({getProduct}) => {
  const {productdata} = useSelector(state => state.OurProductReducer);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    let i = 0;
    if (!isEmpty(productdata)) {
      setLoading(false);
      setData(productdata);
    } else {
      setLoading(true);
    }
  }, [productdata]);

  useEffect(() => {
    fetchMetaData();
  }, []);

  const fetchMetaData = async () => {
   
    getProduct({});
  };
 

  
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 100}}
        />
      ) : (
        <ScrollView>
          {!isEmpty(data) &&
            data?.map((data, i) => (
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#F5F7F9',
                  margin: 7,
                  padding: 10,

                  borderColor: 'rgba(25, 58, 213, 0.1)',
                  shadowColor: 'rgba(25, 58, 213, 0.6)',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 2,

                  borderWidth: 1,
                  elevation: 10,
                }}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Image
                    style={{
                      width: 120,
                      height: 100,
                      borderRadius: 4,
                      borderWidth: 1,
                      // borderColor: '#666666',
                      alignItems: 'center',
                    }}
                    source={{
                      uri: 'https://buyyourproduct.com/wp-content/uploads/Car-Insurance-333.jpg',
                    }}
                  />

                  <View style={{marginLeft: 8, maxWidth: '65%'}}>
                    <Text style={styles.mainHeading}>{data.CLASSNAME}</Text>
                    <Text style={styles.heading}>
                      {data.DEPTNAME}Insurance Products means any insurance,
                      indemnity, annuity or similar products by which one
                      undertakes to indemnify another as to loss from certain.
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

Product.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.OurProductReducer,
});
export default connect(mapStatesToProps, {
  getProduct,

  data,
})(Product);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  date: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12.26,
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    marginTop: 8,

    color: 'rgba(0, 0, 0, 0.5)',
  },

  heading: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16.18,
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    marginTop: 4,
    color: 'rgba(0, 0, 0, 0.7)',
    // textAlign:'justify'
  },

  mainHeading: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 17.7,
    fontStyle: 'normal',
    fontFamily: ['Open Sans'][600],
    marginTop: 4,

    color: '#000000',
  },
});

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// function Item({item}) {
//   return (
//     <View>
//       <View style={styles.listItem}>
//         <Image
//           source={{uri: item.photo}}
//           style={{
//             width: 100,
//             height: 100,
//             borderRadius: 10,
//             borderWidth: 1,
//           }}
//         />

//         <View style={{marginLeft: 16, flex: 1}}>
//           <Text
//             style={{
//               fontWeight: '500',
//               fontSize: 16,
//               lineHeight: 20,
//               fontStyle: 'normal',
//               color: '#262626',
//               marginBottom: 5,
//             }}>
//             {item.name}
//           </Text>
//           <Text style={styles.position}>{item.position}</Text>

//           <TouchableOpacity
//             style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}>
//             <Text style={{color: '#007AFF'}}>Read More</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }
// export default class App extends React.Component {
//   state = {
//     data: [
//       {
//         name: 'House or Property Insurance',
//         email: 'miyah.myles@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://5.imimg.com/data5/NP/PT/MY-5626679/car-insurance-2c-bike-insurance-2c-renewal-etc-500x500.jpg',
//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'june.cha@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OTpoVGT7yhMfuoYTuypJh3oeMLlIWPRqWKN5RN3q3KKBW7BSU0FOnBHaGyibMylBp6Y&usqp=CAU',
//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'iida.niskanen@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://5.imimg.com/data5/WD/QW/BR/ANDROID-11861848/product-jpeg-250x250.jpg',
//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'renee.sims@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCdVacdZtR4aqndj-WXetIGxXn5DyGKlSJ1B2Dcos0IKGN-Bi5-SozId4i5DsKHuwte4&usqp=CAU',
//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'jonathan.nu\u00f1ez@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://staticimg.insurancedekho.com/pwa/uploads/news/thumbnail/Get-Duplicate-Insurance-Copy_-online_1596087807-thumb.jpg',
//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'sasha.ho@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zEYyfzxVbWhIcR2hpktVXqg3XdUJH8uH1Hf8N1tnOv2dIiT9MoTLzpZCLhcAey9jv3M&usqp=CAU',
//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'abdullah.hadley@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',

//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'thomas.stock@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://i0.wp.com/financebuddha.com/blog/wp-content/uploads/2018/07/25182658/Vehicle-Insurance.jpg?fit=1420%2C800&ssl=1',
//       },
//       {
//         name: 'VHouse or Property Insurance',
//         email: 'veeti.seppanen@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://www.boom.ug/wp-content/uploads/2021/09/motor-insurance-companies-in-ug.png',
//       },
//       {
//         name: 'House or Property Insurance',
//         email: 'bonnie.riley@gmail.com',
//         position:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
//         photo:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEx-u9_bfjlOn92MC_CzwargxCFo_7L4oZzmgejz97FYWZ55jPeXmj-bYxfLVXx91haMo&usqp=CAU',
//       },
//     ],
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           {/* <View style={{flexDirection:'row'}}>

//         <TouchableOpacity onPress={() => navigation.navigate('DrawerNavigationRoutes')}>
//           <Image style={styles.imagestyle1} source={require('../assets/Arrowblack.png')}/>
//           </TouchableOpacity>
//           <Text style={styles.text_header1}>Insurance Plans</Text>

//         </View> */}
//         </View>
//         <FlatList
//           style={{flex: 1}}
//           data={this.state.data}
//           renderItem={({item}) => <Item item={item} />}
//           keyExtractor={item => item.email}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//   },
//   listItem: {
//     margin: 15,
//     padding: 10,
//     backgroundColor: 'white',
//     flex: 1,
//     alignSelf: 'center',
//     flexDirection: 'row',
//     borderRadius: 5,
//     marginTop: Platform.OS === 'ios' ? 0 : -1,
//     elevation:5
//   },
//   position: {
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 16,
//     fontStyle: 'normal',
//     marginTop: 8,
//     marginTop: Platform.OS === 'ios' ? 0 : -1,
//     color: '#696969',
//   },
//   imagestyle1: {
//     width: 25,
//     height: 25,
//   },
//   text_header1: {
//     color: '#000000',
//     fontWeight: '500',
//     fontSize: 14,
//     marginTop: 3,
//     marginLeft: 20,
//   },
//   header: {
//     paddingVertical: 0,
//     paddingHorizontal: 0,
//     paddingBottom: 10,
//     flexDirection: 'row',
//   },
// });
