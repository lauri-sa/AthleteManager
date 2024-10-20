import { useReducer } from "react";
import PropTypes from "prop-types";
import UIContext from "./UIContext";
import UIReducer from "./UIReducer";
import { TOGGLE_DARK_MODE, TOGGLE_SIDEBAR, TOGGLE_CREATE_MODAL, TOGGLE_UPDATE_MODAL,TOGGLE_CONFIRMATION_MODAL } from "../ActionTypes";

const UIState = ({ children }) => {
  // Initial state for UI context
  const initialState = {
    isSidebarOpen: false,
    isDarkMode: false,
    isCreateModalOpen: false,
    isUpdateModalOpen: false,
    isConfirmationModalOpen: false,
  };

  // Use reducer to handle UI state changes
  const [state, dispatch] = useReducer(UIReducer, initialState);

  // Function to toggle dark mode state
  const toggleDarkMode = () => {
    dispatch({ type: TOGGLE_DARK_MODE }); // Dispatch action to toggle dark mode state
    // Set theme attribute on document element to change theme
    document.documentElement.setAttribute("data-bs-theme", state.isDarkMode ? "light" : "dark"); 
  };

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR }); // Dispatch action to toggle sidebar state
  };

  // Function to toggle create modal state
  const toggleCreateModal = () => {
    dispatch({ type: TOGGLE_CREATE_MODAL }); // Dispatch action to toggle create modal state
  }

  // Function to toggle update modal state
  const toggleUpdateModal = () => {
    dispatch({ type: TOGGLE_UPDATE_MODAL }); // Dispatch action to toggle update modal state
  };

  // Function to toggle confirmation modal state
  const toggleConfirmationModal = () => {
    dispatch({ type: TOGGLE_CONFIRMATION_MODAL }); // Dispatch action to toggle confirmation modal state
  };

  // Return UI context provider with value prop containing state and functions
  return (
    <UIContext.Provider
      value={{
        isSidebarOpen: state.isSidebarOpen,
        isDarkMode: state.isDarkMode,
        isUpdateModalOpen: state.isUpdateModalOpen,
        isCreateModalOpen: state.isCreateModalOpen,
        isConfirmationModalOpen: state.isConfirmationModalOpen,
        toggleDarkMode,
        toggleSidebar,
        toggleCreateModal,
        toggleUpdateModal,
        toggleConfirmationModal,
      }}
    >
      {children} {/* Render children components */}
    </UIContext.Provider>
  );
};

// Define prop types for UIState component
UIState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UIState;
