import { useOutletContext } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

const Home = () => {
  const { isCollapsed } = useOutletContext();
  return (
    <>
      <div className="flex bg-[var(--bg-feed)]  min-h-screen ">
        <div
          className={`fixed border-r  !border-[var(--border-color)]  top-[56px] left-0 h-full ${
            isCollapsed ? "w-[4%]" : "w-[15%]"
          }`}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        <div
          className={`${
            isCollapsed ? "ml-[5%]" : "ml-[16%]"
          }  flex-1 bg-[var(--bg-feed)]  pt-5`}
        >
          <Feed />
        </div>
      </div>
    </>
  );
};

export default Home;
