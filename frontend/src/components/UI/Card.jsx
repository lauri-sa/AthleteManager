import { useContext } from "react";
import PropTypes from "prop-types";
import UIContext from "../../context/ui/UIContext";
import AthleteContext from "../../context/athlete/AthleteContext";
import "../../styles/css/Card.css";

const Card = ({ index }) => {
  // Get the required values from the UIContext and AthleteContext
  const { toggleUpdateModal } = useContext(UIContext);
  const { setSelectedAthlete, athletes } = useContext(AthleteContext);

  // Destructure the required values from the athletes array at the given index
  const { picture_url, first_name, last_name, Sport } = athletes[index];
  const { sport_name } = Sport;

  // Function to open the modal and set the selected athlete.
  // Both the modal and the selected athlete are managed by the UIContext.
  const openModal = () => {
    setSelectedAthlete(index);
    toggleUpdateModal();
  };

  return (
    <div className="card p-2 text-center border-2">
      <div className="card-image d-flex align-items-center justify-content-center">
        {(picture_url && (
          <img
            src={picture_url}
            className="card-img-top"
            alt="Image of an athlete"
          ></img>
        )) || <p className="fs-4">No image</p>}
      </div>
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title mt-2">{`${first_name} ${last_name}`}</h5>
        <h6 className="mt-2">{sport_name}</h6>
        <button
          className="btn btn-card bg-primary px-3 mt-auto mb-auto border border-2"
          onClick={openModal}
        >
          Info
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Card;
