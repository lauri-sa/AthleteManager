import {
  TOGGLE_DARK_MODE,
  TOGGLE_SIDEBAR,
  TOGGLE_CREATE_MODAL,
  TOGGLE_UPDATE_MODAL,
  TOGGLE_CONFIRMATION_MODAL,
} from "../ActionTypes";

const UIReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };

    case TOGGLE_CREATE_MODAL:
      return {
        ...state,
        isCreateModalOpen: !state.isCreateModalOpen,
      };

    case TOGGLE_UPDATE_MODAL:
      return {
        ...state,
        isUpdateModalOpen: !state.isUpdateModalOpen,
      };

    case TOGGLE_CONFIRMATION_MODAL:
      return {
        ...state,
        isConfirmationModalOpen: !state.isConfirmationModalOpen,
      };

    default:
      return state;
  }
};

export default UIReducer;
