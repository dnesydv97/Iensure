import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  loginContainer: {
    height: '100%',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',

    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  RegisterContainer: {
    height: '100%',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',

    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  dashboardMenuContainer: {
    justifyContent: 'center',

    flex: 1,
  },
  cardMenuContainer: {
    backgroundColor: '#FFFFFF',
    width: 109,
    height: 101,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderColor: '#FDE7E4',
    borderWidth: 1,
    borderRadius: 7,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
  },
  calculateModalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  calculateModalTextContainerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
