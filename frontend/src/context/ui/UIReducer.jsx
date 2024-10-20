import {
  TOGGLE_DARK_MODE,
  TOGGLE_SIDEBAR,
  TOGGLE_CREATE_MODAL,
  TOGGLE_UPDATE_MODAL,
  TOGGLE_CONFIRMATION_MODAL,
} from "../ActionTypes";

// UI Reducer function to handle UI state changes
const UIReducer = (state, action) => {
  switch (
    action.type // Switch statement to determine which action to take
  ) {
    case TOGGLE_DARK_MODE: // If action type is TOGGLE_DARK_MODE then toggle dark mode state and return new state
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };

    case TOGGLE_SIDEBAR: // If action type is TOGGLE_SIDEBAR then toggle sidebar state and return new state
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };

    case TOGGLE_CREATE_MODAL: // If action type is TOGGLE_CREATE_MODAL then toggle create modal state and return new state
      return {
        ...state,
        isCreateModalOpen: !state.isCreateModalOpen,
      };

    case TOGGLE_UPDATE_MODAL: // If action type is TOGGLE_UPDATE_MODAL then toggle update modal state and return new state
      return {
        ...state,
        isUpdateModalOpen: !state.isUpdateModalOpen,
      };

    case TOGGLE_CONFIRMATION_MODAL: // If action type is TOGGLE_CONFIRMATION_MODAL then toggle confirmation modal state and return new state
      return {
        ...state,
        isConfirmationModalOpen: !state.isConfirmationModalOpen,
      };

    default:
      return state;
  }
};

export default UIReducer;
