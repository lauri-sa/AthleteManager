import { Outlet } from "react-router-dom";
import { useContext } from "react";
import UIContext from "../../context/ui/UIContext";
import AthleteState from "../../context/athlete/AthleteState";

const MainContent = () => {
  const { isSidebarOpen } = useContext(UIContext);

  return (
    <AthleteState>
      <div className={`content-fluid ${ isSidebarOpen ? "sidebar-margin margin-width round-corner" : "no-sidebar-margin margin-width-remove" }`}>
        <Outlet />
      </div>
    </AthleteState>
  );
};

export default MainContent;
