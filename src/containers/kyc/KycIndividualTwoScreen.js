import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/KycActions';
import IndividualStepTwo from '../../layout/kyc/IndividualStepTwo';

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      kycData: {},
      errorMessage: '',
      appState: AppState.currentState,
    };

    this.processForm = this.processForm.bind(this);
    this.changeKyc = this.changeKyc.bind(this);
    this.goBackKyc = this.goBackKyc.bind(this);
  }

  /**
   * This function is used for when the authentication state changes.
   * If a user is successful it will navigate to the app page.
   */
  componentDidUpdate(prevProps) {
    // if (prevProps.newUserRegistered !== this.props.newUserRegistered) {
    //     // let newUser = {email: '', userType: ''};
    //     // this.setState({user: newUser, errorMessage: ''});
    //     if(this.state.user.userType == 'Individual') {
    //       this.props.navigation.navigate('KycIndividualStepOne');
    //     }
    //     else {
    //       this.props.navigation.navigate('KycCorporateStepOne');
    //     }
    // }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    this.props.localKycSave(this.state.kycData, 2);
    this.props.navigation.navigate('KycIndividualStepThree', {kycData: this.state.kycData});
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
   goBackKyc(event) {
    this.props.navigation.navigate('KycIndividualStepOne');
  }

  /**
   * Change the user object. Depending on what the user has inputted.
   *
   * @param {object} event - the JavaScript event object
   */
  changeKyc(value, field) {
    const kycData = this.state.kycData;
    kycData[field] = value.trim();

    this.setState({
      kycData,
    });
  }

  render() {
    return (
      <IndividualStepTwo
        onSubmit={this.processForm}
        onChange={this.changeKyc}
        errorMessage={this.props.errorMessage}
        loading={this.props.loadingResource}
        kycData={this.state.kycData}
        onPrevious={this.goBackKyc}
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
    userID: state.auth.userID
  };
}

export default connect(mapStateToProps, actions)(LoginScreen);
