import React from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/KycActions';
import IndividualStepOne from '../../layout/kyc/IndividualStepOne';
import { HeaderBackButton } from 'react-navigation';

class KycIndividualOneScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return{
      headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('Dash')}}/>)
   }
  }
  constructor(props) {
    super(props);

    this.state = {
      kycData: {},
      errorMessage: '',
      appState: AppState.currentState,
    };

    this.processForm = this.processForm.bind(this);
    this.changeKyc = this.changeKyc.bind(this);
  }


  componentDidUpdate(prevProps) {

  }

  
  processForm(event) {
    
    this.props.localKycSave(this.state.kycData, 1);
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
      <IndividualStepOne
        onSubmit={this.processForm}
        onChange={this.changeKyc}
        errorMessage={this.props.errorMessage}
        loading={this.props.loadingResource}
        kycData={this.state.kycData}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    newUserRegistered: state.auth.newUserRegistered,
    errorMessage: state.auth.authError,
    loadingResource: state.auth.loadingResource,
    userID: state.auth.userID
  };
}

export default connect(mapStateToProps, actions)(KycIndividualOneScreen);
