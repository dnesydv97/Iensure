import React from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/AuthAction';
import Setting from '../../layout/home/setting/IndividualProfileSetting';
import { NavigationActions, StackActions } from "react-navigation";
class SettingScreen extends React.Component {
  static navigationOptions = {
  };
  constructor(props) {
    super(props);

  }
  componentDidMount(prevProps) {

  }
  componentDidUpdate(prevProps) {
  }

  logout = async () => {
    this.props.clear();
    this.props.navigation.navigate('Login');
};


  render() {
      return (
        <Setting 
          logout={this.logout}
        />
      );
  }
}

// Map the components properties the state
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.authError,
    loadingResource: state.auth.loadingResource,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(SettingScreen);
