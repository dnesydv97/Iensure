import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/AuthAction';
import SignUp from '../../layout/auth/SignUp';

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        EmailID: this.props.userEmail.length>11?this.props.userEmail:null,
        UserType: this.props.userType,
        Gender: '',
        MobileNo: this.props.userEmail.length<11?this.props.userEmail:null
      },
      errorMessage: '',
      appState: AppState.currentState,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.newUserCreated !== this.props.newUserCreated) {

 
  //     if (this.props.newUserCreated) {
  //       this.props.navigation.navigate('Login');
  //     }
  //   }
  // }

  processForm(event) {
    this.props.localSignup(this.state.newUser, this.props.userID);
  }

  changeUser(value, field) {
    const newUser = this.state.newUser;
    newUser[field] = value;

    this.setState({
      newUser,
    });
  }

  render() {
    return (
      <SignUp
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errorMessage={this.props.errorMessage}
        loading={this.props.loadingResource}
        newUser={this.state.newUser}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    newUserCreated: state.auth.newUserCreated,
    errorMessage: state.auth.authError,
    loadingResource: state.auth.loadingResource,
    userID: state.auth.userID,
    userType: state.auth.userType,
    userEmail: state.auth.userEmail,
  };
}

export default connect(mapStateToProps, actions)(LoginScreen);
