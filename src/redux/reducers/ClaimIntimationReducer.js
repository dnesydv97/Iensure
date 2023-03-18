import {
  CLAIM_INTIMATIONS,
  CLAIM_INTIMATIONS_LIST_INIT,
  CLAIM_INTIMATIONS_LIST,
  CLAIM_INTIMATIONS_LIST_END,
  CLAIM_INTIMATION_FEEDBACK,
  CLAIM_INTIMATIONS_FEEDBACK_SEND,
  CLAIM_INTIMATIONS_INIT,
  CLAIM_INTIMATIONS_END,
} from '../actions/Types';

const initialState = {
  claim: [],
  claimLoading: false,
  claimlist: [],
  claimListLoading: false,
  feedbacklist: [],
  send: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLAIM_INTIMATIONS_INIT:
      return {
        ...state,
        claimLoading: true,
      };

    case CLAIM_INTIMATIONS:
      return {
        ...state,
        claimLoading: false,
        claim: action.payload,
      };

    case CLAIM_INTIMATIONS_END:
      return {
        ...state,
        claimLoading: false,
        claim: [],
      };

    case CLAIM_INTIMATIONS_LIST_INIT:
      return {
        ...state,
        claimlist:[],
        claimListLoading: true,
      };

    case CLAIM_INTIMATIONS_LIST:
      return {
        ...state,
        claimListLoading: false,
        claimlist: action.payload,
      };

    case CLAIM_INTIMATIONS_LIST_END:
      return {
        ...state,
        claimlist: [],
        claimListLoading: false,
      };
    case CLAIM_INTIMATION_FEEDBACK:
      return {
        ...state,
        feedbacklist: action.payload,
      };
    case CLAIM_INTIMATIONS_FEEDBACK_SEND:
      return {
        ...state,
        send: action.payload,
      };
    default:
      return state;
  }
}
