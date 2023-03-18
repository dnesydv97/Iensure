import React, {useEffect, useState} from 'react';
import {View, Text, Modal, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
const PopupErrorModal = ({
  ModalVisible, setModalVisible,error
}) => {
  const {premiumtmi, rate,savetmi} = useSelector(state => state.TMIReducer);
  
  return (
    <View>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(!ModalVisible);
        }}>
        <View
          style={{
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <View
            style={{
              height: '27%',
              width: '95%',
            }}>
            <View
              style={{
                // marginTop: 20,
                backgroundColor: '#fff',
                height: '80%',
                borderRadius: 10,
                // borderTopColor: '#C7C7CC',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#C7C7CC',
                  paddingVertical: 8,
                  padding: 20,
                  backgroundColor: '#F57722',
                  borderTopEndRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 18,
                    lineHeight: 18,
                    fontStyle: 'normal',
                    alignSelf: 'center',
                    color: '#fff',
                  }}>
                  Information
                </Text>
                <Pressable onPress={() => setModalVisible(!ModalVisible)}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 1000,
                      padding: 5,
                      borderRadius: 50,
                    }}>
                    <Icon name="close" size={20} color="#000" />
                  </View>
                </Pressable>
              </View>
              <View>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    fontSize: 20,
                    color: 'red',
                    marginTop: 20,
                    padding: 5,
                  }}>
                  {/* {premiumtmi?.response_message} */}
                {error}
                </Text>
               
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default PopupErrorModal;
