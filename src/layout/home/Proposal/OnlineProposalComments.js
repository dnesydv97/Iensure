import React, {useState, useEffect} from 'react';
import {List} from 'react-native-paper';
import {View, Text, ScrollView} from 'react-native';
import propTypes  from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import { isEmpty} from 'lodash';

import {
  data,
  onlineProposalComments,
} from '../../../redux/actions/ProposalAction';
const OnlineProposalCmt = ({onlineProposalComments,ProposalDocId}) => {
  const {proposalcomment} = useSelector(state => state.ProposalReducer);

  useEffect(() => {
    proposalData();
  }, []);

  const proposalData = async () => {
    onlineProposalComments({DOCID: ProposalDocId});
  };

 

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView>
        <View style={{margin: 10, borderRadius: 10}}>
          <List.Accordion title="Online Proposal Comments">
            {!isEmpty(proposalcomment) &&
              proposalcomment?.data?.map((data, i) => (
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 4,

                    padding: 10,
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                    borderWidth: 1,

                    marginLeft: 4,
                    marginRight: 4,
                    marginTop: 5,
                    elevation: 5,
                    shadowColor: '#000',
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>SN</Text>
                    <Text style={{paddingEnd: 10}}> {data.SN}</Text>
                  </View>


                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Reference Id</Text>
                    <Text style={{paddingEnd: 10}}> {data.REFERENCEID}</Text>
                  </View>

                 
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Column Name</Text>
                    <Text style={{paddingEnd: 10}}> {data.ColumnName}</Text>
                  </View>
                  
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Value Fields</Text>
                    <Text style={{paddingEnd: 10}}>{data.ValueFields}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Comments</Text>
                    <Text style={{paddingEnd: 10}}>{data?.Comments==null? '-':data?.Comments}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Status</Text>
                    <Text style={{paddingEnd: 10}}>
                      {data.Status == 1 ? 'correct' : 'Mistake'}
                      {/* {data.TargetAmount==0?<Text>-</Text>:data.TargetAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                    </Text>
                  </View>
                
                </View>
              ))}
          </List.Accordion>
        </View>
      </ScrollView>
    </View>
  );
};

OnlineProposalCmt.propTypes  = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ProposalReducer,
});
export default connect(mapStatesToProps, {
  data,
  onlineProposalComments,
})(OnlineProposalCmt);
