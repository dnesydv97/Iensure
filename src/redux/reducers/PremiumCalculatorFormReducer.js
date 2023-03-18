import {
  EXCESS_OWN_DAMAGE,
  MANUFACTURE_YEAR,
  GET_CATEGORY_LIST,
  GET_COMPULSORY_EXCESS,
  GET_MAKE_VEHICLE_LIST,
  GET_MAKE_MODEL,
  VEHICLE_NAME_LIST,
  CALC_BIKE_RESET_DATA,
  CALC_BIKE_GET_PICKER,
  PREMIUM_CALC_INIT,
  PREMIUM_CALC_INIT_THIRD_PARTY,
  PREMIUM_CALC,
  PREMIUM_CALC_THIRD_PARTY,
  PREMIUM_CALC_END,
  PREMIUM_CALC_END_THIRD_PARTY,
  SAVE_MOTOR_WIZA,
  MASTER_REFERANCE_ID,
  SAVE_WIZA_INIT,
  SAVE_WIZA_END,

} from '../actions/Types';

const initialState = {
  // category : [{"ID": -1, "TARIFF": '-1'}],
  // category1 : [{"ID": -1, "EDESCRIPTION": -1}],

  picker: [],

  year: [],

  list: [],
  excess: [],
  vehicleList: [],
  makeModel: [],
  vehicleNameList: [],
  premeCalc: '',
  premeCalcLoading: false,
  premeCalcLoadingthirdparty: false,
  savewizA: [],
  token: [],
  categorylist: [],
  savewizALoading: false,
  premeCalcthirdparty:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EXCESS_OWN_DAMAGE:
      if (data) {
        return {
          ...state,
          
          picker: action.payload,
        };
      } else {
        alert('data is empty');
      }
    case PREMIUM_CALC_INIT:
      return {
        ...state,
        premeCalcLoading: true,
        premeCalc: [],
      };
    case PREMIUM_CALC:
      return {
        ...state,
        premeCalcLoading: false,
        premeCalc: action.payload,
      };

      case PREMIUM_CALC_END:
        return {
          ...state,
          premeCalcLoading: false,
          premeCalc: [],
        };
  
        case PREMIUM_CALC_INIT_THIRD_PARTY:
          return {
            ...state,
            premeCalcLoadingthirdparty: true,
            premeCalcthirdparty: [],
          };
    case PREMIUM_CALC_THIRD_PARTY:
      return {
        ...state,
        premeCalcLoadingthirdparty: false,
        premeCalcthirdparty: action.payload,
      };

      case PREMIUM_CALC_END_THIRD_PARTY:
        return {
          ...state,
          premeCalcLoadingthirdparty: false,
          premeCalcthirdparty: [],
        };
  
   
    case MANUFACTURE_YEAR:
      return {
        ...state,
        year: action.payload,
      };

    case GET_CATEGORY_LIST:
      return {
        ...state,
        categorylist: action.payload,
      };

    case GET_COMPULSORY_EXCESS:
      return {
        ...state,
        excess: action.payload,
      };
    case GET_MAKE_VEHICLE_LIST:
      return {
        ...state,

        vehicleList: action.payload,
      };
    case GET_MAKE_MODEL:
      return {
        ...state,

        makeModel: action.payload,
      };
    case VEHICLE_NAME_LIST:
      return {
        ...state,
        vehicleNameList: action.payload,
      };
    case SAVE_WIZA_INIT:
      return {
        ...state,
        savewizALoading: true,
      };
    case SAVE_MOTOR_WIZA:
      return {
        ...state,

        savewizALoading: false,
        savewizA: action.payload,
      };
    case SAVE_WIZA_END:
      return {
        ...state,
        savewizALoading: false,
        savewizA: [],
      };
    case MASTER_REFERANCE_ID:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
