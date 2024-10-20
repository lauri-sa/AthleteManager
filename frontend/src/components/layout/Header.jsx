import { useContext } from "react";
import UIContext from "../../context/ui/UIContext";

const Header = () => {
  // Get the required values from the UIContext
  const { isSidebarOpen, toggleSidebar, toggleDarkMode, isDarkMode } = useContext(UIContext);

  return (
    <header>
      <div className="container-fluid fixed-top">
        <div
          className={`row header-row bg-primary text-light align-items-center
                  ${isSidebarOpen ? "sidebar-margin" : "no-sidebar-margin"}`}
        >
          <div className="col-sm-1">
            <button
              className="btn btn-lg border border-2 border-light px-1 ms-2 text-light"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <i className={isSidebarOpen ? "bi bi-x" : "bi bi-list"} />
            </button>
          </div>
          <div className="col-sm-10 text-center">
            <h2>Athlete Manager</h2>
          </div>
          <div className="col-sm-1 text-end">
            <button
              className="btn btn-lg border border-2 border-light px-1 me-2 text-light"
              onClick={toggleDarkMode}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <i className={isDarkMode ? "bi bi-sun" : "bi bi-moon"} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
