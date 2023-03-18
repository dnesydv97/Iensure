import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/KycActions';
import IndividualStepFour from '../../layout/kyc/IndividualStepFour';

class KycIndividualThreeScreen extends React.Component {
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

  
  componentDidUpdate(prevProps) {
    
    if (prevProps.kycDataIndividual !== this.props.kycDataIndividual) {
      if (this.props.kycDataIndividual) {
        this.props.navigation.navigate('Dash');
      }
    }
  }


  async processForm(event) {
    await this.props.localKycSave(this.state.kycData, 4);
    this.props.localKycPost(this.props.kycDataIndividualOne, this.props.kycDataIndividualTwo, this.props.kycDataIndividualThree, this.props.kycDataIndividualFour)
  }
  
   goBackKyc(event) {
    this.props.navigation.navigate('KycIndividualStepTwo');
  }

 
  changeKyc(value, field) {
    const kycData = this.state.kycData;
    kycData[field] = value.trim();

    this.setState({
      kycData,
    });
  }

  render() {
    return (
      <IndividualStepFour
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
    kycDataIndividualOne: state.kyc.kycDataIndividualOne,
    kycDataIndividualTwo: state.kyc.kycDataIndividualTwo, 
    kycDataIndividualThree: state.kyc.kycDataIndividualThree,
    kycDataIndividualFour: state.kyc.kycDataIndividualFour,
    kycDataIndividual: state.kyc.kycDataIndividual,
  };
}

export default connect(mapStateToProps, actions)(KycIndividualThreeScreen);
