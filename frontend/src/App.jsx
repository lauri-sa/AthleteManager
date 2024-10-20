import { Routes, Route } from "react-router-dom";
import UIState from "./context/ui/UIState";
import PageLayout from "./pages/PageLayout";
import HomePage from "./pages/HomePage";
import AthletesPage from "./pages/AthletesPage";
import "./styles/css/App.css";

function App() {
  return (
    <UIState>
      <Routes>
        <Route path="/" element={ <PageLayout /> }>
          <Route index element={ <HomePage /> } />
          <Route path="/athletes" element={ <AthletesPage/> } />
        </Route>
      </Routes>
    </UIState>
  );
}

export default App;
