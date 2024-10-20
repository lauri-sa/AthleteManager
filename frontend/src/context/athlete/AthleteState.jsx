import { useReducer } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import PropTypes from "prop-types";
import AthleteContext from "./AthleteContext";
import AthleteReducer from "./AtheleteReducer";
import { SET_ATHLETES, SET_SELECTED_ATHLETE, SET_SPORTS } from "../ActionTypes";

const AthleteState = ({ children }) => {
  const initialState = {
    athletes: [],
    selectedAthlete: {},
    sports: [],
  };

  const [state, dispatch] = useReducer(AthleteReducer, initialState);

  const getAthletes = async () => {
    try {
      const res = await AxiosInstance.get("/athletes");
      dispatch({ type: SET_ATHLETES, payload: res.data });
    } catch (err) {
      console.log("Error fetching athletes.", err);
    }
  };

  const getSports = async () => {
    try {
      const res = await AxiosInstance.get("/sports");
      dispatch({ type: SET_SPORTS, payload: res.data });
    } catch (err) {
      console.log("Error fetching sports.", err);
    }
  };

  const createSport = async (sportData) => {
    try {
      const res = await AxiosInstance.post("/sports", sportData);
      dispatch({ type: SET_SPORTS, payload: res.data });
    } catch (err) {
      console.log("Error creating sport.", err);
    }
  };

  const setSelectedAthlete = (index) => {
    const selectedAthlete = state.athletes[index];
    dispatch({ type: SET_SELECTED_ATHLETE, payload: selectedAthlete });
  };

  const createAthlete = async (athleteData) => {
    try {
      const res = await AxiosInstance.post("/athletes", athleteData);
      dispatch({ type: SET_ATHLETES, payload: res.data });
    } catch (err) {
      console.log("Error creating athlete.", err);
    }
  }

  const updateAthlete = async (id, updatedAthleteData) => {
    try {
      const res = await AxiosInstance.put(
        `/athletes/${id}`,
        updatedAthleteData
      );
      dispatch({ type: SET_ATHLETES, payload: res.data });
    } catch (err) {
      console.log("Error updating athlete.", err);
    }
  };

  const deleteAthlete = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/athletes/${id}`);
      dispatch({ type: SET_ATHLETES, payload: res.data });
    } catch (err) {
      console.log("Error deleting athlete.", err);
    }
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes: state.athletes,
        selectedAthlete: state.selectedAthlete,
        sports: state.sports,
        getAthletes,
        getSports,
        createSport,
        setSelectedAthlete,
        createAthlete,
        updateAthlete,
        deleteAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};

AthleteState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AthleteState;
