import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  details: {
    fontWeight: '600',
    fontFamily: 'Open Sans',
    fontSize: 13,
    fontStyle: 'normal',
    alignItems: 'center',
    color: 'rgba(33, 33, 33, 1)',
    marginLeft: 7,
  },
  icon: {height: 16, width: 16, marginTop: 2},
  card:{
    borderRadius: 4,
    backgroundColor: '#F5F7F9',
    margin: 7,
    padding: 10,

    borderColor: 'rgba(25, 58, 213, 0.1)',
    shadowColor: 'rgba(25, 58, 213, 0.6)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,

    borderWidth: 1,
    elevation: 10,
  },
  province:{
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 10,
    color: 'rgba(33, 33, 33, 0.4)',

  },
  branch:{
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
  },
  district:{
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '900',
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 4,
    borderWidth: 1,
    // borderColor: '#666666',
    alignItems: 'center',
    marginTop: 5,
  }
});
