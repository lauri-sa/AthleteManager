import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import MainContent from "../components/layout/MainContent";
import "../styles/css/PageLayout.css";

const PageLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <MainContent />
    </>
  );
};

export default PageLayout;
