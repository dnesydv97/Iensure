import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  latText: {
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    color: '#AEAEB2',
  },
  longText: {
    marginLeft: 10,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#AEAEB2',
  },
  locationImage: {
    height: 35,
    width: 35,

    alignSelf: 'center',
    marginLeft: 10,
  },
  upload: {
    backgroundColor: '#FAFAFA',
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 18,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.5)'

    
  },
  Errorupload: {
    backgroundColor: '#FAFAFA',
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 18,
    borderWidth:1,
    borderColor:'#8b0000'

  },
  uploadText: {
    color: 'rgba(0,0,0,0.4)', fontWeight: '600', fontSize: 16
  },
  uploadTextError: {
    
    fontWeight: '600',
    fontSize: 16,
    color:'#8b0000'
  },
  textInputStyle: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    paddingLeft: 15,
    color: '#AEAEB2', fontWeight: '500', fontSize: 15
  },
  button: {
    backgroundColor: '#F57722',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: '100%',
    marginTop: 100,
    position: 'relative',
    // marginLeft: 32,
    // marginRight:32
  },
  buttonText1: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '500',
    alignSelf: 'center',
  },
  activityIndicator: {
    top: 140,
    // position: 'absolute',
    alignSelf: 'center',
  },
  accordionContainer: {
    marginBottom: 10,
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
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  accordionContent: {
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    paddingVertical: 2,

    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    borderColor: '#C7C7CC',
    borderWidth: 1,
  },
  accordionContentSection: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionContentHeader: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 0,
    fontWeight: '500',
    marginLeft: 10,
    lineHeight: 19.2,
  },
  accordionclaimlistbutton: {
    color: '#000',
    fontSize: 12,
    marginBottom: 0,
    fontWeight: '500',
    alignSelf:'center',
    lineHeight: 19.2,
  },
  accordionContentHeaders: {
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
  },
  accordionHeaderBadgeText: {
    color: '#DD901C',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 250,
    height: 250,
   marginTop:6,
    marginLeft:10,
    borderRadius:8
  },
});
