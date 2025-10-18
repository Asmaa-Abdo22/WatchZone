import { Avatar, Navbar, NavbarBrand } from "flowbite-react";
import { useState } from "react";
import { applyTheme } from "../../components/ThemeToggle";
import { Sun, Moon, Menu, Search, Mic, Grid, Bell } from "lucide-react";
import logo from "../../assets/images/logoicon.svg";
import { Link, NavLink } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

const Navbarr = ({ toggleSidebar }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const [searchvalue, setSearchvalue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getSearchResults = async (searchInputValue) => {
    try {
      const { data } = await axiosInstance.get("/search", {
        params: {
          part: "snippet",
          q: searchInputValue,
          maxResults: 10,
          type: "video",
        },
      });
      console.log("navbar search array data", data.items);
      return data.items;
    } catch (error) {
      console.log("navbar search error", error);
      throw error;
    }
  };

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchInputValue", searchTerm],
    queryFn: () => getSearchResults(searchTerm),
    enabled: !!searchTerm,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar
        fluid
        rounded
        className="navbarrr w-full fixed left-0 right-0 top-0 z-50  items-center !bg-[var(--bg-main)] text-[var(--text-primary)] border-b !border-[var(--border-color)] transition-all py-3"
      >
        <NavLink to="/" className="pl-4 mb-3 md:mb-0 flex items-center">
          <Menu
            className="mr-3 text-[var(--text-secondary)]"
            size={20}
            onClick={toggleSidebar}
          />
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
            value={searchvalue}
            onChange={(e) => setSearchvalue(e.target.value)}
            type="search"
            placeholder="What do you search about?"
            className="grow  border-0 outline-0 focus:outline-0 focus:border-0 placeholder-gray-500"
          />
          <button
            onClick={() => {
              setSearchTerm(searchvalue);
            }}
            className="mr-2 cursor-pointer rounded px-2 bg-blue-400 text-var[(--text-secondary)]"
          >
            Search
          </button>
        </div>

        <div className="rightIcons flex justify-center items-center my-2 gap-3 text-[var(--text-secondary)]">
          <Mic size={18} />
          <Grid size={18} />
          <Bell size={18} />
          <Avatar rounded size="xs" className="cursor-pointer" />
        </div>

        <button
          className="cursor-pointer pr-4  ml-4  pt-1 md:pt-0"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {searchTerm.length > 0 && (
          <div className="absolute md:top-12 w-[70%] m-auto top-24 md:m-0 left-[20%] md:left-[50%] md:-translate-x-1/2 md:w-[50%] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-lg z-40 max-h-80 overflow-y-auto">
            {searchResults?.map((item, i) => (
              <Link
                to={`/video/NA/${item.id.videoId}`}
                key={i}
                className="flex gap-3 p-2 cursor-pointer hover:bg-[var(--bg-hover)]"
                onClick={() => {
                  setSearchTerm("");
                  setSearchvalue("");
                }}
              >
                <img
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                  className="w-20 h-12 object-cover rounded"
                />
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm line-clamp-2">
                    {item.snippet.title}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {item.snippet.channelTitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Navbar>
    </>
  );
};

export default Navbarr;
