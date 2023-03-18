import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import accordionStyle from '../../style/accordion';
import textStyle from '../../style/text';
import buttonStyle from '../../style/button';

import Icon from 'react-native-vector-icons/AntDesign';
import {connect, useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';
import {isEmpty, rest, set} from 'lodash';

import {
  getDocuments,
  data,
  TrackingDocumentUpload,
  TrackingDocumentView,
} from '../../redux/actions/ClaimTrackingAction';
const claimTrackingDocument = ({getDocuments, claimnumber}) => {
  const {document, documentUpload, photoview} = useSelector(
    state => state.ClaimTrackingReducer,
  );

  const [documentData, setDocumentData] = useState();
  const [loading, setLoading] = useState(true);
  const [Bluebook, setBlueBook] = useState([]);
  const user = useSelector(state => state.auth.user);
  const kyc = user[0]?.KycId;
  const Regd = user[0]?.Regd_ID;
  const dispatch = useDispatch();

  const getUploadeImage = (i, imageData) => {
    dispatch(
      TrackingDocumentView({
        ClaimId: imageData.CLAIMID,
        DOCUMENTLISTID: imageData.DOCUMENTID,
      }),
    );
  };

  useEffect(() => {
    let i = 0;
    if (!isEmpty(document)) {
      setLoading(false);
      setDocumentData(document);
    } else {
      setLoading(true);
    }
  }, [document]);

  useEffect(() => {
    fetchMetaData(claimnumber);
  }, [claimnumber]);
  const fetchMetaData = async data => {
    getDocuments({
      CLAIMNO: data,
    });
  };

  const DeleteCopyBlueBook = (selectedKey, listKey) => {
    let newBlueBook = {...Bluebook};
    let selectedData = newBlueBook[listKey][0];
    let filterData = selectedData.filter((data, i) => i !== selectedKey);
    newBlueBook[listKey][0] = filterData;

    if (newBlueBook[listKey][0].length === 0) {
      newBlueBook[listKey][0] = [];
      setBlueBook(newBlueBook);
      return;
    }
    setBlueBook(newBlueBook);
    // setEstimated(['']);
  };

  const selectMultipleBlueBook = async i => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });

      for (const res of results) {
      }
      //Setting the state to show multiple file attributes

      let newResult;

      if (!isEmpty(Bluebook[i])) {
        newResult = [...results, ...Bluebook[i][0]];
      } else {
        newResult = results;
      }

      setBlueBook(Bluebook => ({
        ...Bluebook,
        [i]: [newResult],
      }));
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
      } else {
        //For Unknown Error

        throw err;
      }
    }
  };

  const image = Object.values(Bluebook);

  const handleSubmit = async (listKey, dto) => {
    let body = {
      KycId: kyc,
      userId: Regd,
      ClaimId: dto.CLAIMID,
      DOCUMENTLISTID: dto.DOCUMENTID,
      SURVEYORDOCID: dto.ID,
      AttachmentType: 6,
    };
    let selectedData = Bluebook[listKey][0];

    const data = new FormData();

    data.append('ClaimDocumentInfo', JSON.stringify(body));

    selectedData.forEach((dtos, i) => {
      data.append('File', selectedData[i]);
    });

    dispatch(TrackingDocumentUpload(data));
  };

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#F57722"
            style={{marginTop: 250}}
          />
        ) : (
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              padding: 1,
              paddingTop: 0,
            }}>
            <ScrollView style={{marginBottom: 140}}>
              <View style={accordionStyle.accordionContainer}>
                {!isEmpty(documentData) &&
                  documentData?.data.map((docData, i) => (
                    // prev => prev.filter((data, i) => i !== key))
                    <Collapse>
                      <CollapseHeader style={accordionStyle.accordionModal}>
                        {/* <TouchableOpacity  onPress={()=>  getUploadeImage(i, docData)}> */}
                        <View style={accordionStyle.Filename}>
                          <Text style={textStyle.accordionHeader}>
                            {docData.SN}. {docData.DOCUMENTNAME}
                          </Text>
                        </View>
                        {/* </TouchableOpacity> */}
                        <View style={accordionStyle.accordionHeaderBadge}>
                          {!isEmpty(Bluebook[i]) &&
                          Bluebook[i][0].length > 0 ? (
                            <Text
                              style={accordionStyle.accordionHeaderBadgeText}>
                              Approval Pending
                            </Text>
                          ) : (
                            <Text
                              style={accordionStyle.accordionHeaderBadgeText}>
                              Select Files
                            </Text>
                          )}
                        </View>
                      </CollapseHeader>
                      <CollapseBody style={accordionStyle.accordionContent}>
                        <View style={{width: '100%'}}>
                          <View style={accordionStyle.ContentSection}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                style={accordionStyle.Uploadicon}
                                source={require('../../assets/claim-tracking/upload.png')}
                              />

                              <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                  selectMultipleBlueBook(i);
                                }}>
                                <Text style={accordionStyle.accordionUpload}>
                                  Choose Files
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View>
                              {!isEmpty(Bluebook[i]) &&
                              Bluebook[i][0].length > 0 ? (
                                <TouchableOpacity
                                  style={buttonStyle.login}
                                  onPress={() => handleSubmit(i, docData)}>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      color: '#fff',
                                      fontWeight: '500',
                                      textAlign: 'center',
                                      paddingEnd: 10,
                                      paddingStart: 10,
                                    }}>
                                    Upload
                                  </Text>
                                </TouchableOpacity>
                              ) : null}
                            </View>
                          </View>
                          <ScrollView horizontal={true}>
                            {Bluebook[i] &&
                              Bluebook[i][0]?.map((item, key) => (
                                <View key={key}>
                                  <View>
                                    <Image
                                      style={{
                                        width: 180,
                                        height: 180,
                                        marginTop: 6,
                                        marginLeft: 10,
                                        borderRadius: 6,
                                      }}
                                      source={{uri: item?.uri}}
                                    />

                                    {!isEmpty(item?.uri) ? (
                                      <TouchableOpacity
                                        onPress={() =>
                                          DeleteCopyBlueBook(key, i)
                                        }
                                        style={{
                                          position: 'absolute',
                                          alignSelf: 'flex-end',
                                          marginTop: 6,
                                          backgroundColor: 'red',
                                          borderRadius: 50,
                                        }}>
                                        <Icon
                                          name="delete"
                                          size={25}
                                          color="#fff"
                                          style={{padding: 5}}
                                        />
                                      </TouchableOpacity>
                                    ) : null}
                                  </View>
                                </View>
                              ))}
                            {!isEmpty(photoview) && photoview?.data?.map((value)=>
                             
                              <Image style={{ width: 180,
                                        height: 180,
                                        marginTop: 6,
                                        marginLeft: 10,
                                        borderRadius: 6,}}
                                         source={{uri:  `data:image/png;base64,${value.Image}`}}
                                        
                                         />
                                         )}
                          </ScrollView>
                        </View>
                      </CollapseBody>
                    </Collapse>
                  ))}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

claimTrackingDocument.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ClaimTrackingReducer,
});
export default connect(mapStatesToProps, {
  getDocuments,
  data,
})(claimTrackingDocument);
