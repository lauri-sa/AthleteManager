import { useReducer } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import PropTypes from "prop-types";
import AthleteContext from "./AthleteContext";
import AthleteReducer from "./AtheleteReducer";
import { SET_ATHLETES, SET_SELECTED_ATHLETE, SET_SPORTS } from "../ActionTypes";

const AthleteState = ({ children }) => {
  // Initial state for the AthleteContext
  const initialState = {
    athletes: [],
    selectedAthlete: {},
    sports: [],
  };

  // useReducer hook to manage the state and dispatch actions
  const [state, dispatch] = useReducer(AthleteReducer, initialState);

  // Function to fetch athletes from the API and update the state
  const getAthletes = async () => {
    try {
      const res = await AxiosInstance.get("/athletes"); // Fetch athletes from the API using AxiosInstance
      dispatch({ type: SET_ATHLETES, payload: res.data }); // Dispatch the action to update the athletes in the state
    } catch (err) {
      console.log("Error fetching athletes.", err); // Log an error if there is an issue fetching athletes
    }
  };

  // Function to fetch sports from the API and update the state
  const getSports = async () => {
    try {
      const res = await AxiosInstance.get("/sports"); // Fetch sports from the API using AxiosInstance
      dispatch({ type: SET_SPORTS, payload: res.data }); // Dispatch the action to update the sports in the state
    } catch (err) {
      console.log("Error fetching sports.", err); // Log an error if there is an issue fetching sports
    }
  };

  // Function to create a new sport and update the state
  const createSport = async (sportData) => {
    try {
      const res = await AxiosInstance.post("/sports", sportData); // Create a new sport using AxiosInstance
      dispatch({ type: SET_SPORTS, payload: res.data }); // Dispatch the action to update the sports in the state
    } catch (err) {
      console.log("Error creating sport.", err); // Log an error if there is an issue creating a sport
    }
  };

  // Function to set the selected athlete in the state
  const setSelectedAthlete = (index) => {
    const selectedAthlete = state.athletes[index]; // Get the selected athlete from the athletes array
    dispatch({ type: SET_SELECTED_ATHLETE, payload: selectedAthlete }); // Dispatch the action to set the selected athlete in the state
  };

  // Function to create a new athlete and update the state
  const createAthlete = async (athleteData) => {
    try {
      const res = await AxiosInstance.post("/athletes", athleteData); // Create a new athlete using AxiosInstance
      dispatch({ type: SET_ATHLETES, payload: res.data }); // Dispatch the action to update the athletes in the state
    } catch (err) {
      console.log("Error creating athlete.", err); // Log an error if there is an issue creating an athlete
    }
  }

  // Function to update an athlete and update the state
  const updateAthlete = async (id, updatedAthleteData) => {
    try {
      const res = await AxiosInstance.put( // Update the athlete using AxiosInstance
        `/athletes/${id}`,
        updatedAthleteData
      );
      dispatch({ type: SET_ATHLETES, payload: res.data }); // Dispatch the action to update the athletes in the state
    } catch (err) {
      console.log("Error updating athlete.", err); // Log an error if there is an issue updating an athlete
    }
  };

  // Function to delete an athlete and update the state
  const deleteAthlete = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/athletes/${id}`); // Delete the athlete using AxiosInstance
      dispatch({ type: SET_ATHLETES, payload: res.data }); // Dispatch the action to update the athletes in the state
    } catch (err) {
      console.log("Error deleting athlete.", err); // Log an error if there is an issue deleting an athlete
    }
  };

  // Return the AthleteContext.Provider with the value prop containing the state and functions
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
      {children} {/* Render the children components */}
    </AthleteContext.Provider>
  );
};

// Define the prop types for the AthleteState component
AthleteState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AthleteState;
