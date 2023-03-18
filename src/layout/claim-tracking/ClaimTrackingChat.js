import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {
  FeedbackChat,
  data,
  FeedbackSavedChat,
} from '../../redux/actions/ClaimTrackingAction';
import moment from 'moment';

const Chat = ({FeedbackChat, FeedbackSavedChat, route}) => {

  const claimId = !isEmpty(route) && route?.params.ID;
  const [messages, setMessages] = useState([]);
  const {chat, saved} = useSelector(state => state.ClaimTrackingReducer);
  const [feedback, setFeedBack] = useState();
  const [feedbacksaved, setFeedBacksaved] = useState();
  const user = useSelector(state => state.auth.user);
  const kyc = user[0]?.KycId;
  const dispatch = useDispatch();


  useEffect(() => {
    let i = 0;
    if (!isEmpty(chat)) {
      setFeedBack(chat);
    }
  }, [chat]);

 

  const fetchMetaData1 = async messages => {

    FeedbackSavedChat({
      CLIENTUSERID: kyc,
      CLAIMID: claimId,
      FEEDBACK: messages[0].text,
    });
  };


  useEffect(() => {
    if (!isEmpty(feedback)) {
      const messagesData = feedback;

      const message = messagesData?.data?.map((messages, index) => ({
        _id: index,
        text: messages.DESCRITION,
        createdAt: moment(messages.SAVEDDATETIME).format('LLL'),
        // moment().format('LLL')
        user: {
          _id: index + 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }));
      setMessages(message);
    }
  }, [feedback]);



  const onSend = useCallback((messages = []) => {
    setFeedBacksaved(messages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    fetchMetaData1(messages);
  }, []);

  useEffect(() => {
    fetchMetaData();
  }, []);
  const fetchMetaData = async () => {
    FeedbackChat({
      CLAIMID: claimId,
    });
  };
  const MessengerBarContainer = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#fff',
          alignContent: 'center',
          justifyContent: 'center',
          borderWidth: 0,
          paddingTop: 6,
          marginHorizontal: 0,
          borderRadius: 6,
          borderTopColor: 'transparent',
          marginBottom: 5,
        }}
      />
    );
  };
  return (
    <GiftedChat
      // placeholder={''}
      renderInputToolbar={props => MessengerBarContainer(props)}
      messages={messages}
      // messagesContainerStyle={{marginLeft:-100}}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

Chat.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ClaimTrackingReducer,
});
export default connect(mapStatesToProps, {
  FeedbackChat,
  data,
  FeedbackSavedChat,
})(Chat);
