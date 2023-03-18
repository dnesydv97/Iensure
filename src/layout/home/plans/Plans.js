import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

function Item({item}) {
  return (
    <View>
      <View style={styles.listItem}>
        <Image
          source={{uri: item.photo}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            borderWidth: 1,
          }}
        />

        <View style={{marginLeft: 16, flex: 1}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              lineHeight: 20,
              fontStyle: 'normal',
              color: '#262626',
              marginBottom: 5,
            }}>
            {item.name}
          </Text>
          <Text style={styles.position}>{item.position}</Text>
          <Text style={styles.position}>{item.phoneno}</Text>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}>
            <Text style={{color: '#007AFF'}}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default class Plans extends React.Component {
  state = {
    data: [
      {
        name: 'House or Property Insurance',
        email: 'miyah.myles@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://5.imimg.com/data5/NP/PT/MY-5626679/car-insurance-2c-bike-insurance-2c-renewal-etc-500x500.jpg',
      },
      {
        name: 'House or Property Insurance',
        email: 'june.cha@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OTpoVGT7yhMfuoYTuypJh3oeMLlIWPRqWKN5RN3q3KKBW7BSU0FOnBHaGyibMylBp6Y&usqp=CAU',
      },
      {
        name: 'House or Property Insurance',
        email: 'iida.niskanen@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://5.imimg.com/data5/WD/QW/BR/ANDROID-11861848/product-jpeg-250x250.jpg',
      },
      {
        name: 'House or Property Insurance',
        email: 'renee.sims@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCdVacdZtR4aqndj-WXetIGxXn5DyGKlSJ1B2Dcos0IKGN-Bi5-SozId4i5DsKHuwte4&usqp=CAU',
      },
      {
        name: 'House or Property Insurance',
        email: 'jonathan.nu\u00f1ez@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://staticimg.insurancedekho.com/pwa/uploads/news/thumbnail/Get-Duplicate-Insurance-Copy_-online_1596087807-thumb.jpg',
      },
      {
        name: 'House or Property Insurance',
        email: 'sasha.ho@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zEYyfzxVbWhIcR2hpktVXqg3XdUJH8uH1Hf8N1tnOv2dIiT9MoTLzpZCLhcAey9jv3M&usqp=CAU',
      },
      {
        name: 'House or Property Insurance',
        email: 'abdullah.hadley@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'data:image/jpeg;base64,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',
      },
      {
        name: 'House or Property Insurance',
        email: 'thomas.stock@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://i0.wp.com/financebuddha.com/blog/wp-content/uploads/2018/07/25182658/Vehicle-Insurance.jpg?fit=1420%2C800&ssl=1',
      },
      {
        name: 'VHouse or Property Insurance',
        email: 'veeti.seppanen@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://www.boom.ug/wp-content/uploads/2021/09/motor-insurance-companies-in-ug.png',
      },
      {
        name: 'House or Property Insurance',
        email: 'bonnie.riley@gmail.com',
        position:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero morbi ultricies condimentum ut eget ',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEx-u9_bfjlOn92MC_CzwargxCFo_7L4oZzmgejz97FYWZ55jPeXmj-bYxfLVXx91haMo&usqp=CAU',
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <View style={{flexDirection:'row'}}>
       
        <TouchableOpacity onPress={() => navigation.navigate('DrawerNavigationRoutes')}>
          <Image style={styles.imagestyle1} source={require('../assets/Arrowblack.png')}/>
          </TouchableOpacity>
          <Text style={styles.text_header1}>Insurance Plans</Text>
       
        </View> */}
        </View>
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listItem: {
    margin: 15,
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: Platform.OS === 'ios' ? 0 : -1,
  },
  position: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontStyle: 'normal',
    marginTop: 8,
    marginTop: Platform.OS === 'ios' ? 0 : -1,
    color: '#696969',
  },
  imagestyle1: {
    width: 25,
    height: 25,
  },
  text_header1: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 3,
    marginLeft: 20,
  },
  header: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingBottom: 10,
    flexDirection: 'row',
  },
});
