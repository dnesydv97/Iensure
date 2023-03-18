import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item} style={styles.image} />
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    paddingHorizontal: 20,
    paddingTop: 10,
   
  },
  image: {
    height: 180,
    borderRadius: 8,
    width:'100%',
   
  },
});

export default CarouselCardItem;
