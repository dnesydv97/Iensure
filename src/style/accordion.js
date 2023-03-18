import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  accordionContainer: {
    marginBottom: 15,
  },
  Filename: {
    maxWidth: '60%',
  },
  Icon: {
    maxWidth: '10%'
  },
  Uploadicon: {
    height: 16,
    width: 16,
  },
  header:{borderRadius: 10, padding: 10,backgroundColor:'rgba(0,0,0,0.1)',},
  uploadfile: {
    backgroundColor: '#F57722',
    borderRadius: 4,
    height: 40,
    paddingVertical: 11,
    width: '100%',
  },
  uploadphotoText:{
  fontSize: 15,
  color: '#fff',
  fontWeight: '500',
  textAlign: 'center',
  paddingEnd: 10,
  paddingStart: 10,
},
  accordionUpload: {
   fontWeight:'400',
   fontSize:14,
    marginLeft:5,
    fontStyle:'Roboto',
    color:'#212121'
  },
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 7,
  },
  accordionModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxWidth: '100%',
    borderRadius: 4,
    marginTop:20
  },
  accordionContent: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    borderColor: '#C7C7CC',
    borderWidth: 0.5,
    borderTopWidth:0,
    borderBottomEndRadius:6,
    borderBottomLeftRadius:6
  },
  accordionContentSection: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ContentSection: {
    marginBottom: 15,
    flexDirection: 'row',
justifyContent:'space-between',
    alignItems: 'center',
  },
  accordionContentSectiones: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
  },
  kycEdit: {
    marginBottom: 10,

    paddingEnd: 10,

    alignSelf: 'flex-end',
  },
  accordionContentSections: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionContentHeader: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 14,
    marginBottom: 0,
    fontWeight: '400',
    marginLeft: 10,
    fontFamily: 'Montserrat',
  },
  accordionContentHeaders: {
    color: '#242424',
    fontSize: 14,
    marginBottom: 0,
    fontWeight: '400',
    marginLeft: 10,
    lineHeight: 22,
  },
  accordionContentHeaderText: {
    color: '#242424',
    fontSize: 14,
    marginBottom: 0,
    fontWeight: '400',
    marginLeft: 10,
    lineHeight: 22,
  },
  accordionContentHeaderone: {
    color: '#666666',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '500',
    marginLeft: 20,
  },
  accordionButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  accordionHeaderBadge: {
    backgroundColor: '#FFE2B6',
    paddingHorizontal: 15,
    paddingVertical: 5,
    maxWidth: '50%',
    alignItems: 'flex-start',
    borderRadius:4
  },
  accordionHeaderBadgeText: {
    color: '#DD901C',
  },
 
});
