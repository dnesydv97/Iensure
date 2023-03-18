import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
      
        backgroundColor:'#fff',
        flex:1
    },
  accordionContainer: {
    marginBottom: 15
  },
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#C7C7CC'
  },
  accordionModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical:  8
  },
  accordionContent: {
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    borderColor: '#C7C7CC',
    borderWidth: 1
  },
  accordionContentSection: {
      marginTop:20,
    marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  accordionContentHeader: {
     color: '#666666',
  
    fontSize: 15,
    marginBottom: 0,
    fontWeight: '500',
    marginLeft:12
  },
  accordionContentHeaderone: {
    color: '#666666',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '500',
    marginLeft:20
  },
  accordionButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 11,
    paddingVertical: 5
  },
  accordionHeaderBadge: {
    backgroundColor: '#FFE2B6',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  accordionHeaderBadgeText: {
    color: '#DD901C'
  },
 botton: {
    backgroundColor: '#F57722',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop:100,
  },
 bottondis: {
    backgroundColor: '#fbc8a5',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop:100,
  },
  bottontext:{
    fontSize: 15,

    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
  },
 
});
