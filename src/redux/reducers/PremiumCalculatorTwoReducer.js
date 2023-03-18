import {
    GET_MAKE_VEHICLE_LIST,
    GET_MAKE_MODEL,
    VEHICLE_NAME_LIST,
    GET_OCCUPTION_LIST,
    LOADING_UI,SAVE_MOTOR_WIZ_B

  } from '../actions/Types';
  
  const initialState = {
    vehicleList: [],
    makeModel: [],
    vehicleNameList: [],
    occuptionlist:[],
    loadingUi: false,
    saveBData:''
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
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
      case LOADING_UI:
        return {
          ...state,
          loadingUi: action.running,
        };
      case VEHICLE_NAME_LIST:
        return {
          ...state,
  
          vehicleNameList: action.payload,
        };
        case GET_OCCUPTION_LIST:
          return {
            ...state,
           
            occuptionlist: action.payload
          };
  
        case SAVE_MOTOR_WIZ_B:
       
          return {
            ...state,
           
            saveBData: action.payload
          };
  
      default:
        return state;
    }
  }
  