import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/AuthAction';
import Register from '../../layout/auth/Register';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      user: {
        UserId: '',
        UserTypeId: '',
      },
      errorMessage: '',
      appState: AppState.currentState,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.signUpPage = this.signUpPage.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.skipRegister = this.skipRegister.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.gotoExisting = this.gotoExisting.bind(this);
  }

  /**
   * This function is used for when the authentication state changes.
   * If a user is successful it will navigate to the app page.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.newUserRegistered !== this.props.newUserRegistered) {
      let newUser = {UserId: '', UserTypeId: ''};
      this.setState({user: newUser, errorMessage: ''});
      // if(this.state.user.userType == 'Individual') {
      //   this.props.navigation.navigate('KycIndividualStepOne');
      // }
      // else {
      //   this.props.navigation.navigate('KycCorporateStepOne');
      // }
      if (this.props.newUserRegistered) {
        
        this.props.navigation.navigate('AccountVerification');
      }
    }
  }

  
  processForm(event) {
  
    this.props.localRegister(
      this.state.user.UserId,
      this.state.user.UserTypeId,
    );
  }


  changeUser(value, field) {
    const user = this.state.user;
    user[field] = value.trim();

    this.setState({
      user,
    });
  }

  forgotPassword() {
    this.props.navigation.navigate('Forgot-Password');
  }
  signUpPage() {
    this.props.navigation.navigate('SignUp');
  }
  skipRegister() {
    this.props.navigation.navigate('Dash');
  }
  goToLogin() {
    this.props.navigation.navigate('Login');
  }
  gotoExisting() {
    this.props.navigation.navigate('ExistingUser');
  }

  render() {
    return (
      <Register
        onRegister={this.processForm}
        onChange={this.changeUser}
        errorMessage={this.props.errorMessage}
        loading={this.props.loadingResource}
        signUp={this.signUpPage}
        user={this.state.user}
        skipRegister={this.skipRegister}
        goToLogin={this.goToLogin}
        gotoExisting={this.gotoExisting}
      />
    );
  }
}

// Map the components properties the state
function mapStateToProps(state) {
  return {
    newUserRegistered: state.auth.newUserRegistered,
    errorMessage: state.auth.authError,
    loadingResource: state.auth.loadingResource,
    userData: state.auth.userData,
  };
}

export default connect(mapStateToProps, actions)(RegisterScreen);
