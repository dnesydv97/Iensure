import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  dashboardCardMenuText: {
    fontSize: 13,
    color: '#686868',
    fontWeight: '500',
    alignSelf: 'center',
    lineHeight:21,
    fontFamily:['SF Pro Display'][500],
  },
  picker:{ backgroundColor: '#FAFAFA',
  borderRadius: 6,
  height: 50,
  marginTop:4,
  justifyContent: 'center',
  paddingLeft: 10,
  marginBottom: 10,
  borderWidth:1,
  borderColor:'#686868'},
  redBorder:{
    backgroundColor: '#FAFAFA',
  borderRadius: 6,
  height: 50,
  marginTop:4,
  justifyContent: 'center',
  paddingLeft: 10,
  marginBottom: 10,
    borderWidth:1,
    borderColor:'#8b0000'
  },
  loginText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
   
    textAlign:'center'

  },
  logoutText: {
    fontSize: 20,
    color: '#F57722',
    fontWeight: '500',
    marginLeft: 15
  },
  previousText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
    alignSelf: 'center',
  },
  secondaryText: {
    fontSize: 13,
    color: '#686868',
    fontWeight: '400',
    alignSelf: 'center',
    
  },
  underlineText: {
    textDecorationLine: 'underline',
    paddingBottom: 2,
  },
  uploadText: {
    color: '#686868',
    fontWeight: '400',
    fontSize: 16,
  },
  uploadTextFile: {
    color: '#AEAEB2',
    fontWeight: '400',
    fontSize: 15,
    margin: 5
  },
  uploadTextBlue: {
    color: '#007AFF',
    fontWeight: '400',
    fontSize: 15,
    margin: 5
  },
  accordionHeader: {
    fontWeight: '700',
     
    fontSize:14

  },
  calculateModalText: {
    fontWeight: '700',
    fontSize: 15,
    width: '49%'
  },
  calculateModalTextIcon: {
    fontWeight: '700',
    fontSize: 15,
    width: '40%'
  },
  calculateModalTexts: {
    fontWeight: '500',
    fontSize: 14,
    width: '45%'
  },
  calculateModalTextRight: {
    fontWeight: '700',
    fontSize: 15,
    width: '49%',
    textAlign: 'right'
  },
  calculateModalTextRightIcon: {
    fontWeight: '400',
    fontSize: 14,
    width: '60%',
    textAlign: 'right'
  },
  calculateModalTextRights: {
    fontWeight: '400',
    fontSize: 14,
    width: '55%',
    textAlign: 'right'
  },
  currentLatitude:{
    fontSize: 16,
    // color: '#AEAEB2',
    color: '#000',
    fontWeight: '400',
    alignSelf: 'center',
    marginLeft:2
  }
});
