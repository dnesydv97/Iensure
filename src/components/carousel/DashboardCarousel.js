import React from 'react';
import {View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from './DashboardCarouselItem';
import data from './DashboardCarouselData';

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={1}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
        sliderHeight={500}
        itemHeight={500}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
        autoplay={true}
        loop={true}
      
        enableMomentum={true}
     decelerationRate={0.9}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          borderRadius: 5,
          marginHorizontal: 0,
          margin: 0,
          padding: 0,
          backgroundColor: '#F57722'
        }}
        containerStyle={{position:'absolute',
      alignSelf:'center',bottom:0
    }}
        inactiveDotOpacity={2}
        inactiveDotScale={0.5}
        tappableDots={true}
      />
    </View>
  );
};

export default CarouselCards;
