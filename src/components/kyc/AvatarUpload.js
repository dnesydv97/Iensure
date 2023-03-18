import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getProfileUpload, ProfileUpload} from '../../redux/actions/KycActions';

import {useDispatch, useSelector, connect} from 'react-redux';
import {isEmpty} from 'lodash';

import DocumentPicker from 'react-native-document-picker';
import {Avatar} from 'react-native-paper';
const UploadImage = (props) => {
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const Regd = !isEmpty(user) && user[0]?.Regd_ID;
  const {profile,getprofile} = useSelector(state => state.KycFormReducer);

  const [filePath, setFilePath] = useState('');

  const fileData = !isEmpty(filePath) && filePath[0];

  const imagepath = !isEmpty(getprofile) && getprofile?.data?.Image;
  const baseImage = `data:image/png;base64,${imagepath}`;

  const upload = async () => {
    let body = {
      Regd_ID: Regd,
    };
    const data = new FormData();
    data.append('UserProfile', JSON.stringify(body));
    data.append('File', ...filePath);
    dispatch(ProfileUpload(data));
  };

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setFilePath(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
       
      } else {
       
        throw err;
      }
    }
  };
  useEffect(() => {
    if (!isEmpty(filePath)) {
      upload();
    }
  }, [filePath]);
  return (
    <>
      <View style={[styles.container,props.imageHeightContainer]}>
        <Avatar.Image
          style={props.imageHeight}
          // source={{uri: filePath?.assets[0]?.uri}}
          source={{uri: baseImage}}
          size={props.size}
        />
{props.camera && 
        <View style={styles.uploadBtnContainer}>
          <TouchableOpacity onPress={selectOneFile} style={styles.uploadBtn}>
            <Icon name="camera" size={26} />
          </TouchableOpacity>
        </View>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '35%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UploadImage;
