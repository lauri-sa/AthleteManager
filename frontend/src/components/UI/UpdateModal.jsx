import { useContext, useState, useEffect } from "react";
import moment from "moment";
import UIContext from "../../context/ui/UIContext";
import AthleteContext from "../../context/athlete/AthleteContext";
import ConfirmationModal from "./ConfirmationModal";
import validator from "../../utils/InputValidation";
import "../../styles/css/Modal.css";

const Modal = () => {
  // Initialize the state variables using the useState hook.
  // The athleteData state variable stores the data of the selected athlete.
  // The pictureUrl state variable stores the URL of the athlete's image.
  // The achievements state variable stores the achievements of the athlete.
  // The modifyState state variable determines if the modal is in modify state.
  // The confirmationActionType state variable stores the type of action to be confirmed.
  const [pictureUrl, setPictureUrl] = useState("");
  const [athleteData, setAthleteData] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [modifyState, setModifyState] = useState(false);
  const [confirmationActionType, setConfirmationActionType] = useState("");

  // Destructure the necessary functions and state variables from the UIContext and AthleteContext.
  const { toggleUpdateModal, toggleConfirmationModal, isConfirmationModalOpen } =
    useContext(UIContext);
  const { selectedAthlete, getSports, sports, updateAthlete } =
    useContext(AthleteContext);

  // Destructure the necessary data from the athleteData object.
  const { id, picture_url, Sport, Achievements } = athleteData || {};
  const { sport_name } = Sport || {};

  // The useEffect hook is used to fetch the sports data and set the athleteData, pictureUrl, and achievements state variables.
  useEffect(() => {
    getSports();
    setAthleteData(selectedAthlete);
    setPictureUrl(picture_url || "");
    setAchievements(Achievements || []);
  }, [selectedAthlete, picture_url, Achievements]);

  // Event handler function to handle the changes in the input fields.
  const handleOnChange = (e) => {
    let { name, value } = e.target; // Destructure the name and value from the event target.

    if (name === "picture_url") { // If the name is picture_url, set the pictureUrl state variable to the value
      setPictureUrl(value);
    } else if (name === "sport_name") {
      // If the name is sport_name, find the correct sport_id from the sports array and set the sport_id in the athleteData state variable.
      const sport_id = sports.find((sport) => sport.sport_name === value)?.id;
      setAthleteData((prev) => ({
        ...prev,
        sport_id: sport_id,
      }));
    } else { // Otherwise, update the athleteData state variable with the new value.
      setAthleteData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Event handler function to handle the update button click.
  const handleUpdateButton = (e) => {
    e.preventDefault(); // Prevent the default behavior of the event.
    setModifyState(true); // Set the modifyState state variable to true.
  };

  // Event handler function to handle the cancel button click.
  const handleCancelButton = (e) => {
    e.preventDefault(); // Prevent the default behavior of the event.
    setAthleteData(selectedAthlete); // Reset the athleteData state variable to the selectedAthlete.
    setPictureUrl(picture_url); // Reset the pictureUrl state variable to the picture_url.
    setAchievements(Achievements); // Reset the achievements state variable to the Achievements.
    setModifyState(false); // Set the modifyState state variable to false.
  };

  // Event handler function to handle the close button click.
  const handleCloseButton = (e) => {
    e.preventDefault(); // Prevent the default behavior of the event.
    if (modifyState) {
      // If the modal is in modify state, set the confirmationActionType to close and toggle the confirmation modal.
      setConfirmationActionType("close");
      toggleConfirmationModal();
    } else {
      // Otherwise, close the update modal.
      toggleUpdateModal();
    }
  };

  // Event handler function to handle the delete button click.
  const handleDeleteButton = (e) => {
    e.preventDefault(); // Prevent the default behavior of the event.
    setConfirmationActionType("delete"); // Set the confirmationActionType to delete.
    toggleConfirmationModal(); // Toggle the confirmation modal.
  };

  // Event handler function to handle the save button click.
  const handleSaveButton = (e) => {
    e.preventDefault(); // Prevent the default behavior of the event.
    const isValid = validator(athleteData, achievements, pictureUrl); // Validate the input fields.
    if (isValid) { // If the input fields are valid, update the athlete data. Update is handled by AthleteContext.
      updateAthlete(id, {
        ...athleteData,
        nickname: athleteData.nickname || null, // Set the nickname to null if it is an empty string.
        picture_url: pictureUrl || null, // Set the picture_url to null if it is an empty string.
        Achievements: achievements,
      });
      toggleUpdateModal(); // Close the update modal.
    }
  };

  // Event handler function to handle the add achievement button click.
  const handleAddAchievement = (e) => {
    e.preventDefault(); // Prevent the default behavior of the event.
    setAchievements((prev) => [...prev, { athlete_id: id, achievement: "" }]); // Add a empty achievement to the achievements state variable.
  };

  // Event handler function to handle the delete achievement button click.
  const handleDeleteAchievement = (e, index) => {
    e.preventDefault(); // Prevent the default behavior of the event.
    // Use the filter method to remove the achievement at the specified index.
    setAchievements((prev) => prev.filter((_, i) => i !== index)); 
  };

  // Event handler function to handle the changes in the achievements state variable.
  const handleAchievementChange = (index, value) => {
    setAchievements((prev) => {
      const newAchievements = [...prev]; // Create a copy of the achievements state variable
      newAchievements[index].achievement = value; // Update the achievement at the specified index
      return newAchievements; // Return the updated achievements
    });
  };

  // Define the formFields array that contains the form fields for the athlete data.
  const formFields = [
    { label: "First name", name: "first_name", type: "text" },
    { label: "Last name", name: "last_name", type: "text" },
    { label: "Nickname", name: "nickname", type: "text" },
    {
      label: "Birthday",
      name: "birth_date",
      type: "date",
      min: "1900-01-01",
      max: moment().format("YYYY-MM-DD"),
    },
    { label: "Weight", name: "weight", type: "number", unit: "kg" },
    { label: "Sport", name: "sport_name", type: "text" },
  ];

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered mx-auto text-center">
        <div className="modal-content border-2">
          <form>
            <div className="modal-body update-modal fs-5 p-2 pb-3">
              <div className="container-fluid">
                <div className="row mb-3">
                  <div className="col-sm-12">
                    {(picture_url && (
                      <img
                        src={picture_url}
                        className="modal-image w-100 rounded-top"
                        alt="Image of an athlete"
                      />
                    )) || (
                      <div className="modal-image w-100 border border-2 rounded-top d-flex align-items-center justify-content-center">
                        <p className="fs-4">No image</p>
                      </div>
                    )}
                  </div>
                </div>

                {formFields.map((field, index) => {
                  const { [field.name]: value } = athleteData;
                  return (
                    <div className="input-group" key={index}>
                      <div className="row w-75 mt-2 mx-auto">
                        <div className="col-sm-6 text-start">
                          {modifyState ? (
                            <label className="form-label" htmlFor={field.name}>
                              {field.label}:
                            </label>
                          ) : (
                            <p>{field.label}:</p>
                          )}
                        </div>
                        <div className="col-sm-6">
                          {modifyState ? (
                            field.name === "sport_name" ? (
                              <select
                                className="form-select border-2 px-2"
                                id={field.name}
                                name="sport_name"
                                value={
                                  sports.find(
                                    (sport) => sport.id === athleteData.sport_id
                                  )?.sport_name
                                }
                                onChange={handleOnChange}
                              >
                                <option disabled>Select Sport</option>
                                {sports.map((sport) => (
                                  <option
                                    key={sport.id}
                                    name="sport_name"
                                    value={sport.sport_name}
                                  >
                                    {sport.sport_name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                className="form-control border-2 px-2"
                                id={field.name}
                                type={field.type}
                                value={value || ""}
                                name={field.name}
                                placeholder={field.label}
                                onChange={handleOnChange}
                                min={
                                  field.type === "date" ? field.min : undefined
                                }
                                max={
                                  field.type === "date" ? field.max : undefined
                                }
                              />
                            )
                          ) : (
                            <p className="text-end">
                              {field.unit
                                ? `${value} ${field.unit}`
                                : field.name === "nickname"
                                ? value || ""
                                : value || sport_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {modifyState && (
                  <div className="row mt-2 w-75 mx-auto">
                    <div className="col-sm-6 text-start">
                      <label className="form-label" htmlFor="picture_url">
                        Picture URL:
                      </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="form-control border-2 px-2"
                        id="picture_url"
                        type="text"
                        name="picture_url"
                        placeholder="Picture URL"
                        value={pictureUrl}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                )}

                {Achievements && (
                  <>
                    <div className="row mt-5">
                      <div className="col-sm-12">
                        <p className="mb-2 fw-bold">Achievements</p>
                        <i className="bi bi-arrow-down"></i>
                      </div>
                    </div>

                    {achievements.map((achievement, index) => (
                      <div className="row mt-2" key={index}>
                        <div className="col-sm-12">
                          {modifyState ? (
                            <div className="input-group w-75 mx-auto">
                              <input
                                className="form-control border-2 ps-2"
                                value={achievement.achievement}
                                onChange={(e) =>
                                  handleAchievementChange(index, e.target.value)
                                }
                              />
                              <button
                                className="btn btn-delete bg-primary border border-2 ms-2 px-1"
                                onClick={(e) =>
                                  handleDeleteAchievement(e, index)
                                }
                              >
                                <i className="bi bi-trash" />
                              </button>
                            </div>
                          ) : (
                            <p>{achievement.achievement}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {modifyState && (
                  <button
                    className="btn btn-modal bg-primary border border-2 mt-2"
                    onClick={handleAddAchievement}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>

            <div className="modal-footer border-2 d-flex justify-content-center">
              {modifyState ? (
                <>
                  <button
                    className="btn btn-modal bg-primary border border-2 my-2"
                    onClick={handleSaveButton}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-modal bg-primary border border-2 my-2 mx-2"
                    onClick={handleCancelButton}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-modal bg-primary border border-2 my-2"
                    onClick={handleUpdateButton}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-modal bg-primary border border-2 my-2 mx-2"
                    onClick={handleDeleteButton}
                  >
                    Delete
                  </button>
                </>
              )}

              <button
                className="btn btn-modal bg-primary border border-2 my-2"
                onClick={handleCloseButton}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {isConfirmationModalOpen && (
        <ConfirmationModal actionType={confirmationActionType} />
      )}
    </div>
  );
};

export default Modal;
