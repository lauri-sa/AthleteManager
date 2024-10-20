import { SET_ATHLETES, SET_SELECTED_ATHLETE, SET_SPORTS } from "../ActionTypes";

// Reducer function for AthleteContext
const AthleteReducer = (state, action) => {
  const { type, payload } = action; // Destructure the action object to get the type and payload.

  // Switch statement to determine the action type
  switch (type) {
    case SET_ATHLETES: // If the action type is SET_ATHLETES then return the new state with the updated athletes.
      return {
        ...state,
        athletes: payload,
      };

    // If the action type is SET_SELECTED_ATHLETE then return the new state with the updated selected athlete.
    case SET_SELECTED_ATHLETE:
      return {
        ...state,
        selectedAthlete: payload,
      };

    // If the action type is SET_SPORTS then return the new state with the updated sports.
    case SET_SPORTS:
      return {
        ...state,
        sports: payload,
      };

    // If the action type is not recognized then return the current state.
    default:
      return state;
  }
};

export default AthleteReducer;
