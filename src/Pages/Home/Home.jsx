import { useOutletContext } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import { useState } from "react";

const Home = () => {
  const { isCollapsed } = useOutletContext();
  const [category, setCategory] = useState(0);
  return (
    <>
      <div className=" homesection flex bg-[var(--bg-feed)]  min-h-screen ">
        <div
          className={`fixed border-r  !border-[var(--border-color)]  top-[52px] left-0 h-full ${
            isCollapsed ? "w-[4%]" : "w-[15%]"
          }`}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div
          className={`${
            isCollapsed ? "ml-[5%]" : "ml-[16%]"
          }  flex-1 bg-[var(--bg-feed)]  pt-5 px-4  mt-12 md:mt-2`}
        >
          <Feed category={category} />
        </div>
      </div>
    </>
  );
};

export default Home;
