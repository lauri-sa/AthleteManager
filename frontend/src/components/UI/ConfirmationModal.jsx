import { useContext } from "react";
import PropTypes from "prop-types";
import AthleteContext from "../../context/athlete/AthleteContext";
import UIContext from "../../context/ui/UIContext";
import "../../styles/css/Modal.css";

const ConfirmationModal = ({ actionType }) => {
  // Get the required values from the UIContext and AthleteContext
  const { toggleConfirmationModal, toggleUpdateModal } = useContext(UIContext);
  const { selectedAthlete, deleteAthlete } = useContext(AthleteContext);

  // Destructure the id from the selected athlete
  const { id } = selectedAthlete;

  // Function to close the modals. Both functions are managed by the UIContext.
  const closeModals = () => {
    toggleConfirmationModal();
    toggleUpdateModal();
  }

  // Function to handle the close action.
  const handleClose = () => {
    closeModals();
  };

  // Function to handle the delete action. The deleteAthlete function is managed by the AthleteContext.
  const handleDelete = () => {
    deleteAthlete(id);
    closeModals();
  }

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered mx-auto text-center">
        <div className="modal-content border-2 mx-4">
          <div className="modal-header py-2 border-2 d-flex justify-content-center">
            <h4 className="modal-title fw-bold">
              Confirmation
            </h4>
          </div>
          <div className="modal-body py-2 fs-5">
            {actionType === "close" && (
              <p>All unsaved modifications will be lost, are you sure?</p>
            )}
            {actionType === "delete" && (
              <p>Are you sure that you want to delete this athlete?</p>
            )}
          </div>
          <div className="modal-footer border-2 d-flex justify-content-center">
            <button
              className="btn btn-modal bg-primary border border-2 my-2 me-2"
              onClick={() => toggleConfirmationModal()}
            >
              Cancel
            </button>

            {actionType === "close" && (
              <button
                className="btn btn-modal bg-primary border border-2 my-2"
                onClick={handleClose}
              >
                Close
              </button>
            )}

            {actionType === "delete" && (
              <button
                className="btn btn-modal bg-primary border border-2 my-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  actionType: PropTypes.string.isRequired,
};

export default ConfirmationModal;
