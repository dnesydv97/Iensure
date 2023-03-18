import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  dashboardCarousel: {},
  dashboardCardMenus: {
   
    width: '35%',
    height: '34%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  dashboardCardMenu: {
    width: '30%',
    height: '35%',
    // width: '35%',
    // height: '34%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 16
  },
  dashboardCardMenunonstaff: {
    width: '30%',
    height: '40%',
  
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 16
  },
  body:{
    width: '30%',
    height: '94%',
  
  },
  bodynonstaff:{
    width: '30%',
    height: '100%',
  
  },
  eachbody:{
    
      backgroundColor: '#fff',
      height: '100%',
      alignItems: 'flex-start',
      borderColor: '#FDE7E4',
      borderWidth: 1,
      borderRadius: 7,
      overflow: 'hidden',
      shadowColor:"#000",
      shadowOffset: { width:1, height:15}, shadowOpacity:0.8, shadowRadius:0, elevation:10,
     
    
  
  },
  premiumCalCardMenu: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  premiumCalculatorMenu: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 20,
    alignSelf: 'center',
  },
  location:{
    height:35,
    width:35,
    //  alignSelf:'center',
    marginTop:5,
     right:15

  }
});
