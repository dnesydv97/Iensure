import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/AuthAction';
import AccountVerification from '../../layout/auth/AccountVerification';

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      code: {
        code: '',
      },
      errorMessage: '',
      appState: AppState.currentState,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * This function is used for when the authentication state changes.
   * If a user is successful it will navigate to the app page.
   */
  componentDidUpdate(prevProps) {
   
    if (prevProps.verified !== this.props.verified) {
   
      if (this.props.verified) {
        this.props.navigation.navigate('SignUp');
      }
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  async processForm(event) {
    await this.props.localVerify(this.state.code.code, this.props.userId);
  
    // if (this.props.verified) {
    //   if (this.props.verified) {
    //     this.props.navigation.navigate('SignUp');
    //   }
    // }
  }

  /**
   * Change the user object. Depending on what the user has inputted.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(value, field) {
    const code = this.state.code;
    code[field] = value.trim();

    this.setState({
      code,
    });
  }

  render() {
    return (
      <AccountVerification
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errorMessage={this.props.errorMessage}
        loading={this.props.loadingResource}
        code={this.state.code}
      />
    );
  }
}

// Map the components properties the state
function mapStateToProps(state) {
  return {
    userId: state.auth.userID,
    verified: state.auth.verified,
    loadingResource: state.auth.loadingResource,
  };
}

export default connect(mapStateToProps, actions)(LoginScreen);
