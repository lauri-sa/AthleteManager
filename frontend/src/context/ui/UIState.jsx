import { useReducer } from "react";
import PropTypes from "prop-types";
import UIContext from "./UIContext";
import UIReducer from "./UIReducer";
import { TOGGLE_DARK_MODE, TOGGLE_SIDEBAR, TOGGLE_CREATE_MODAL, TOGGLE_UPDATE_MODAL,TOGGLE_CONFIRMATION_MODAL } from "../ActionTypes";

const UIState = ({ children }) => {
  const initialState = {
    isSidebarOpen: false,
    isDarkMode: false,
    isCreateModalOpen: false,
    isUpdateModalOpen: false,
    isConfirmationModalOpen: false,
  };

  const [state, dispatch] = useReducer(UIReducer, initialState);

  const toggleDarkMode = () => {
    dispatch({ type: TOGGLE_DARK_MODE });
    document.documentElement.setAttribute("data-bs-theme", state.isDarkMode ? "light" : "dark");
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const toggleCreateModal = () => {
    dispatch({ type: TOGGLE_CREATE_MODAL });
  }

  const toggleUpdateModal = () => {
    dispatch({ type: TOGGLE_UPDATE_MODAL });
  };

  const toggleConfirmationModal = () => {
    dispatch({ type: TOGGLE_CONFIRMATION_MODAL });
  };

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
      {children}
    </UIContext.Provider>
  );
};

UIState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UIState;
