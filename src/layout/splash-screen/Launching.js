import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import styles from '../../style/splash';
const Launching = () => {
  const navigation = useNavigation();
  const [showRealApp, setShowRealApp] = useState(false);
  const [hidden, setHidden] = useState(true);
  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <StatusBar hidden={hidden} />
        <Text style={styles.toptext}>Next</Text>
      </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <StatusBar hidden={hidden} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          {/* onPress={() => navigation.navigate('OTPScreen')}> */}
          <Text style={styles.toptext}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        {/* onPress={() => navigation.navigate('BikePolicy')}> */}
        <View style={styles.buttonCircle1}>
          <Text style={styles.skiptext1}>Skip</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
        
        }}>
        <View style={{height: '60%'}}>
          <Image style={styles.introImageStyle} source={item.image} />
        </View>
        <View>
          <Text style={styles.introTitleStyle}>{item.title}</Text>
        </View>
        <View style={{height: '24%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.introTextStyle}>{item.text}</Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
        activeDotStyle={{backgroundColor: '#F57722'}}
        dotStyle={{backgroundColor: 'rgba(245, 119, 34, 0.2)'}}
        renderNextButton={RenderNextButton}
        renderDoneButton={RenderDoneButton}
        renderSkipButton={renderSkipButton}
      />
    </>
  );
};

export default Launching;

const slides = [
  {
    key: 's1',
    text: `Looking for Bike insurance in Nepal? We at Premier Insurance provides all kinds of bike insurance service in Nepal. Cover the risk of incurring legal liability to pay compensation to the third party for death, bodily injury, property damage arising out of the use of the motorcycle, with further heavy loss of accidental damage to the bike (motorcycle) itself.`,
    title: 'Motorcycle Insurance',
    image: require('../../assets/splash/Bikemotorins.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 's2',
    title: 'Commercial Vehicle',
    text: 'Commercial Vehicle insurance is an insurance policy that protects the owner of the vehicle against any financial loss arising out of damage or theft vehicle. Commercial vehicle coverage also includes damage caused to a third party or property.',
    image: require('../../assets/splash/motorins.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 's3',
    title: 'Property Insurance',
    text: 'We provide the best property insurance in Nepal. We have a policy to protect your properties under various uncertainties. The policy includes all types of properties.',
    image: require('../../assets/splash/homeIns.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 's4',
    title: 'Family Home Insurance',
    text: `We have the best home insurance in Nepal. With us, you will have a secure and low-risk profile.   Wherever you go we are always beside you on your risk-free journey, with your complications as solely ours, letting you move forward freely on your journey of life profession, and career.
Our team can assure you with greater security of you, your family, and your property, such that you need not worry and be rest assured with us.`,
    image: require('../../assets/splash/FamilyHome.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 's5',
    title: 'Engineering Insurance',
    text: `Whereas the Insured named in the schedule hereto has made to the PREMIER INSURANCE CO. (Nepal) LTD. (hereinafter called "the Company") a written proposal by completing a questionnaire which, together with any other statements made in writing by theInsured for the purpose of this Policy, is deemed to be incorporated herein,`,
    image: require('../../assets/splash/Engineering.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 's6',
    title: 'Private Car Insurance',
    text: `Every vehicle on roads runs the risk of incurring legal liability to pay compensation to the third party for death, bodily injury, property damage arising out of the use of the vehicle, with further heavy loss of accidental damage to the vehicle itself. This policy indemnifies vehicle owners against such contingencies. Private car owners with car insurance in Nepal can avail of this insurance cover against comprehensive risks including third party personal injury and property damage and additionally riot & strike, earthquake, flood, personal accident to passengers, drivers, etc.`,
    image: require('../../assets/splash/carnew.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 's7',
    title: 'Delivering Promises',
    text: `Incorporated on 12th may 1994, Premier Insurance Company (Nepal) Limited has emerged as a renowned general insurance company of the second generation. The company has earned a reputation in the local and international insurance and reinsurance sectors as well for its professionalism and services.`,
    image: require('../../assets/splash/goDigit.png'),
    backgroundColor: '#FFFFFF',
  },
];
