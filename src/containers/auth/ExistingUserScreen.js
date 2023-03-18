
import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/AuthAction';
import ExistingUser from '../../layout/auth/ExistingUser'

class ExistingUserScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      user: {
        UserId: '',
        
      },
      
      errorMessage: '',
      appState: AppState.currentState,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.signUpPage = this.signUpPage.bind(this);
  
  }

  /**
   * This function is used for when the authentication state changes.
   * If a user is successful it will navigate to the app page.
   */
  componentDidUpdate(prevProps) {
   
    if (prevProps.newUserRegisteredexisting !== this.props.newUserRegisteredexisting) {
      let newUser = {UserId: ''};
      this.setState({user: newUser, errorMessage: ''});
     
      if (this.props.newUserRegisteredexisting) {
        
        this.props.navigation.navigate('AccountVerification');
      }
    }
  }

  
  processForm(event) {

    this.props.ExistingUser(
      this.state.user?.MobileNo,
      
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
  gotoExisting() {
    this.props.navigation.navigate('ExistingUser');
  }
 
  render() {
   
    return (
      <ExistingUser
      onExistingRegister={this.processForm}
        onChange={this.changeUser}
        errorMessage={this.props.errorMessage}
        loading={this.props.loadingResource}
        signUp={this.signUpPage}
        user={this.state.user}
        gotoExisting={this.gotoExisting}
      />
    );
  }
}

// Map the components properties the state
function mapStateToProps(state) {
  return {
    newUserRegisteredexisting: state.auth.newUserRegisteredexisting,
    errorMessage: state.auth.authError,
    loadingResource: state.auth.loadingResource,
    userData: state.auth.userData,
  };
}

export default connect(mapStateToProps, actions)(ExistingUserScreen);
