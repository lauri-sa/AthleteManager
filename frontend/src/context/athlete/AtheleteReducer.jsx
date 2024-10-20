import { SET_ATHLETES, SET_SELECTED_ATHLETE, SET_SPORTS } from "../ActionTypes";

const AthleteReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ATHLETES:
      return {
        ...state,
        athletes: payload,
      };

    case SET_SELECTED_ATHLETE:
      return {
        ...state,
        selectedAthlete: payload,
      };

    case SET_SPORTS:
      return {
        ...state,
        sports: payload,
      };

    default:
      return state;
  }
};

export default AthleteReducer;
