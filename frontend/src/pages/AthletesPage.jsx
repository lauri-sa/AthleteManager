import { useEffect, useContext } from "react";
import UIContext from '../context/ui/UIContext';
import AthleteContext from "../context/athlete/AthleteContext";
import Card from "../components/UI/Card";
import UpdateModal from "../components/UI/UpdateModal";
import CreateModal from "../components/UI/CreateModal";

const AthletesPage = () => {
  const { isUpdateModalOpen, isCreateModalOpen, toggleCreateModal } = useContext(UIContext);
  const { athletes, getAthletes } = useContext(AthleteContext);

  useEffect(() => {
    getAthletes();
  }, []);

  return (
    <section aria-label="Athlete list" className="h-100 w-100">
      <div className="container-fluid h-100">
        <div className="row">
          <div className="col-sm-3 p-2">
            <div className="card border-2 d-flex justify-content-center">
            <p className="fs-4 w-50 mx-auto text-center">Add athlete</p>
              <button className="btn px-2 btn-card bg-primary border border-2 mx-auto"
                      onClick={() => toggleCreateModal()}>+</button>
            </div>
          </div>
          {athletes.map((athlete, index) => (
            <div className="col-sm-3 p-2" key={athlete.id}>
              <Card index={index} />
            </div>
          ))}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateModal/>
      )}

      {isUpdateModalOpen && (
        <UpdateModal/>
      )}

    </section>
  );
};

export default AthletesPage;
