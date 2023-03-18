import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    top: 95,
  },

  boxbranch: {
    borderRadius: 4,
    paddingVertical: 6,
    borderWidth: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 20,
    paddingRight: 20,
    width: 70,
  },

  Headerdata: {
  
    flexDirection: 'row',
    justifyContent: 'space-between',
     padding: 15,
    backgroundColor: '#FFFDF5',
    
    borderRadius: 5,
    //  margin: 10,
     width:'100%'
 
  },

  modalbackground: {height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'},

  modalbody: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: '55%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalbodyinner: {
    marginTop: 20,
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 10,
    borderTopColor: '#C7C7CC',
  },
  modalheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7CC',
    paddingVertical: 14,
    padding:20
  },

  filtertext: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18,
    fontStyle: 'normal',
  },
  crossicon: {
    borderRadius: 99999999999999,
    // padding: 5,
  },

  innermodel: {
    padding: 20,
   marginTop:-10,
   marginBottom:90
  },

  picker: {
    flexDirection: 'row',
     justifyContent: 'space-between',
    marginTop: 8,
  },
  branchtext: {
    fontSize: 14,
    lineHeight: 16.41,
    fontWeight: '400',
    color: '#000000',
    marginTop: 8,
  },
  pickerbox: {
    backgroundColor: '#FFFFFF',
    width: '78%',
    borderRadius: 6,

    //  height: 40,
    alignItems: 'flex-start',
    paddingVertical: 0.1,
    borderWidth: 1,
    borderColor: ' rgba(0, 0, 0, 0.2)',
    // paddingVertical: 2,
  },
  pickericon: {
    height: 40,
    width: 250,
  
     alignSelf: 'flex-end',
    marginTop: -10,
 
  
   
  },
  

  pickererror: {
    width: '100%',
    height: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  timebox: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 10,

 
    // //paddingVertical: 2,
    // borderWidth: 1,

    // alignSelf: 'center',
    // borderColor: 'rgba(0, 0, 0, 0.08)',
    // paddingLeft: 2,
    // paddingRight: 2,
    // paddingBottom: 20,
  },
  fromtext: {
    fontSize: 14,
    lineHeight: 14.06,
    fontWeight: '400',
    color: '#000000',
    marginTop: 5,
  },
  forwardicon: {height: 7.99, width: 12.8, marginTop: 35},

  box: {
    borderRadius: 4,
    paddingVertical: 6,
    borderWidth: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 10,
    paddingRight: 10,
  },
  boxfield: {
    borderRadius: 4,
    paddingVertical: 6,
    borderWidth: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 20,
    paddingRight: 20,
  },
  boxtext: {
    fontSize: 12,
    color: '#212121',
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: 14.06,
    fontStyle: 'normal',
  },
  boxtextfield: {
    fontSize: 12,
    color: '#212121',
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: 14.06,
    fontStyle: 'normal',
  },
  login: {
      marginTop:20,
    backgroundColor: '#F57722',
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 12,
 width:'100%',
 alignSelf:'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
  },
});
