import { Avatar, Navbar, NavbarBrand } from "flowbite-react";
import { useState } from "react";
import { applyTheme } from "../../components/ThemeToggle";
import { Sun, Moon, Menu, Search, Mic, Grid, Bell } from "lucide-react";
import logo from "../../assets/images/logoicon.svg";
import { NavLink } from "react-router-dom";

const Navbarr = ({toggleSidebar}) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };
 
  return (
    <>
      <Navbar
        fluid
        rounded
        className="navbarrr w-full fixed left-0 right-0 top-0 z-50  items-center !bg-[var(--bg-main)] text-[var(--text-primary)] border-b !border-[var(--border-color)] transition-all py-3"
      >
        <NavLink to="/" className="pl-4 mb-3 md:mb-0 flex items-center">
          <Menu className="mr-3 text-[var(--text-secondary)]" size={20} onClick={toggleSidebar} />
          <img src={logo} className="mr-3  w-6  " alt="watchzone  Logo" />
          <span className="self-center whitespace-nowrap text-2xl -mt-1 font-bold dark:text-white">
            watchzone
          </span>
        </NavLink>

        <div
          className="navMiddle flex justify-center items-center gap-1 m-auto  sm:w-full md:w-5/12
            border rounded py-1 !border-[var(--border-color)] px-1 sm:mt-4 md:mt-0"
        >
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="grow  border-0 outline-0 focus:outline-0 focus:border-0 placeholder-gray-500"
          />
        </div>

        <div className="rightIcons flex justify-center items-center gap-3 text-[var(--text-secondary)]">
          <Mic size={18} />
          <Grid size={18} />
          <Bell size={18} />
          <Avatar rounded size="xs" className="cursor-pointer" />
        </div>

        <button
          className="cursor-pointer pr-4  ml-4  sm:mt-4 md:mt-0"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </Navbar>
    </>
  );
};

export default Navbarr;
