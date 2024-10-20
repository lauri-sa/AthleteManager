import { useContext } from "react";
import { Link } from "react-router-dom";
import UIContext from "../../context/ui/UIContext";

const Sidebar = () => {
  // Get the required value from the UIContext
  const { isSidebarOpen } = useContext(UIContext);

  return (
    <nav>
      <div
        className={`container fixed-top bg-primary sidebar text-center text-light d-flex flex-column ${
          isSidebarOpen ? "open" : ""
        }`}
      >
        <div className="row header-row align-items-center">
          <div className="col-sm-12">
            <h3>Menu</h3>
          </div>
        </div>

        <div className="row flex-grow-1">
          <div className="col-sm-12">
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/"
                  className="btn link-btn mt-2 mx-4 fs-5 border border-2 border-light
                            text-light d-flex align-items-center justify-content-center"
                  aria-label="Open home page"
                >
                  <i className="bi bi-house me-2"></i> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/athletes"
                  className="btn link-btn mt-2 mx-4 fs-5 border border-2 border-light
                            text-light d-flex align-items-center justify-content-center"
                  aria-label="Open athletes page"
                >
                  <i className="bi bi-people me-2"></i> Athletes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-auto mb-2">
          <div className="col-sm-12">
            <p>Copyright &copy; Lauri Saarenpää 2024</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
