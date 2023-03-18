import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/AuthAction';
import Login from '../../layout/auth/Login';

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
   
    super(props);

    this.state = {
      user: {
        email: '9823542893',
        password: '12345678',
      },
      errorMessage: '',
      appState: AppState.currentState,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.signUpPage = this.signUpPage.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.skipLogin = this.skipLogin.bind(this);
    this.goToRegister = this.goToRegister.bind(this);

    // this.props.clear();
  }

  
  processForm = async () => {
    await this.props.localLogin(
      this.state.user.email,
      this.state.user.password,
    );
  };

  changeUser(value, field) {
    const user = this.state.user;
    user[field] = value.trim();

    this.setState({
      user,
    });
  }

  forgotPassword() {
    this.props.navigation.navigate('ForgotPassword');
  }
  signUpPage() {
    this.props.navigation.navigate('SignUp');
  }
  skipLogin() {
    this.props.navigation.navigate('Dash');
  }
  goToRegister() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <Login
        onLogin={this.processForm}
        onChange={this.changeUser}
        errorMessage={this.props.errorMessage}
        loading={this.props.loadingResource}
        signUp={this.signUpPage}
        user={this.state.user}
        forgotPassword={this.forgotPassword}
        skipLogin={this.skipLogin}
        goToRegister={this.goToRegister}
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
    userData: state.auth.userData,
  };
}

export default connect(mapStateToProps, actions)(LoginScreen);
