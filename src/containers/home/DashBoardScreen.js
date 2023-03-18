import React from 'react';
import {AppState, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/AuthAction';
import Dashboard from '../../layout/home/Dashboard';
import { isEmpty } from 'lodash';

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      kyc: ' ',
      userName: ' ',
      appState: AppState.currentState,
    };

    this.goToClaimIntimation = this.goToClaimIntimation.bind(this);
  }
  componentDidMount(prevProps) {
    if(!isEmpty(this.props.user)){
    if (Object.keys(this.props.user).length != 0) {
      this.setState({
        userName: this.props.user[0].FullName,
      });
    }}
  }

  goToClaimIntimation() {}

  render() {
    return (
      <Dashboard
        goToClaimIntimation={this.goToClaimIntimation}
        userName={this.state.userName}
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
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, actions)(LoginScreen);
