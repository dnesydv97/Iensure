import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';

import {
  claimintimationFeedbackList,
  claimintimationFeedback,
  data,
} from '../../redux/actions/ClaimIntimationAction';
import moment from 'moment';

const Chat = ({
  claimintimationFeedbackList,
  claimintimationFeedback,
  route,
}) => {
  const user = useSelector(state => state.auth.user);

  const userid = !isEmpty(user) && user[0]?.Regd_ID;
  const [messages, setMessages] = useState([]);
  const ID = !isEmpty(route) && route?.params?.paramKey;
console.log("ID",ID)
  const {feedbacklist, send} = useSelector(
    state => state.ClaimIntimationReducer,
  );
  console.log("send",send)
  // console.log("feedbacklist",feedbacklist)
  const [feedback, setFeedBack] = useState();
  const [feedbacksaved, setFeedBacksaved] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(feedbacklist)) {
      setFeedBack(feedbacklist);
    }
  }, [feedbacklist]);

  const fetchMetaData1 = async messages => {
    claimintimationFeedback({
      //   CLIENTUSERID: 729,
      //   CLAIMID: 221122,
      //   FEEDBACK: messages[0].text,
      ClaimIntimationId: ID,
      Feedback: messages[0].text,
      UserId: userid,
    });
  };

 

  useEffect(() => {
    if (!isEmpty(feedback)) {
      const messagesData = feedback;

      const message = messagesData?.data?.map((messages, index) => ({
        _id: index,
        text: messages.feedback,
        createdAt: moment(messages.addeddate).format('LLL'),

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
    claimintimationFeedbackList({
      ClaimIntimationId: ID,
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
          marginHorizontal: 6,
          borderRadius: 6,
          borderTopColor: 'transparent',
          marginBottom: 0,
        }}
      />
    );
  };
  return (
    <GiftedChat
      // placeholder={''}
      renderInputToolbar={props => MessengerBarContainer(props)}
      messages={messages}
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
  data: state.ClaimIntimationReducer,
});
export default connect(mapStatesToProps, {
  claimintimationFeedbackList,
  data,
  claimintimationFeedback,
})(Chat);
