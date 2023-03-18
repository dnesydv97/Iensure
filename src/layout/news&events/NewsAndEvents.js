import React, {useState, useEffect, useCallback} from 'react';
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
import {NewsandEvents} from '../../redux/actions/NewsAndEventsAction';
import propTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';

const NewsEvents = ({NewsandEvents}) => {
  const user = useSelector(state => state.auth.user);
  const Regd = user[0]?.Regd_ID;
  const {events} = useSelector(state => state.NewEventsReducer);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = (e) => {
    //To toggle the show text or hide it
    setTextShown(!textShown,e);
  
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
   
  }, []);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState();
  useEffect(() => {
   
    if (!isEmpty(events)) {
      setLoading(false);
      setNews(events);
    } else {
      setLoading(true);
    }
  }, [events]);

  useEffect(() => {
    fetchMetaData();
  }, []);

  const fetchMetaData = async () => {
    NewsandEvents({
      USERID: Regd,
      //  USERID: 219,
      PageNumber: 1,
      PageSize: 10,
    });
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
          {!isEmpty(news) &&
            news?.data?.map((data, i) => (
           
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#F5F7F9',
                  margin: 16,
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
                      width: 100,
                      height: 80,
                      borderRadius: 4,
                      borderWidth: 1,
                      // borderColor: '#666666',
                      alignItems: 'center',
                    }}
                    source={{
                      uri: 'https://www.ulwembubs.com/assets/img/busconsul.jpg',
                    }}
                  />

                  <View style={{marginLeft: 8, maxWidth: '67%'}}>
                  
                    <Text style={styles.mainHeading}>{data?.TITLE}</Text>
                    <Text
                      style={styles.heading}
                      onTextLayout={onTextLayout}
                      numberOfLines={textShown ? undefined : 2}>
                       
                      {data.DESCRIPTION}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        alignItems: 'flex-end',
                      }}>
                      <Text style={styles.date}>{data.NewsDate}</Text>

                      {lengthMore ? (
                        <Text onPress={()=>{toggleNumberOfLines(i)}} style={styles.date}>
                          {textShown ? 'Read less <' : 'Read more >'}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            ))}
       
           
              {!isEmpty(news) && news?.data[0]?.DESCRIPTION == null?<Image style={{height:500,width:500,alignSelf:'center'}} source={require('../../assets/nulldata.jpg')} /> : null}
          
         
        </ScrollView>
      )}
    </View>
  );
};

NewsEvents.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.NewEventsReducer,
});
export default connect(mapStatesToProps, {
  NewsandEvents,
})(NewsEvents);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  date: {
    fontWeight: '600',
    lineHeight: 12.26,
    fontStyle: 'normal',
    fontSize: 10,
    fontFamily: ['Open Sans'][600],
    marginTop: 8,

    color: 'rgba(0, 0, 0, 0.5)',
  },

  heading: {
    fontSize: 13,
    fontWeight: '500',
    // lineHeight: 19,
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    marginTop: 2,
    color: 'rgba(0, 0, 0, 0.7)',
    // maxHeight:40
  },

  mainHeading: {
    fontSize: 14,

    lineHeight: 17.7,
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    marginTop: 2,
    color: '#000000',
    fontWeight: 'bold',
  },
});

