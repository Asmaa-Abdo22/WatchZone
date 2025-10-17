import {
  Home,
  Gamepad2,
  Car,
  Trophy,
  Clapperboard,
  Cpu,
  Music,
  FileText,
  Newspaper,
  User,
} from "lucide-react";
import { Avatar } from "flowbite-react";
import { useState } from "react";
const Sidebar = ({ isCollapsed, setCategory, category }) => {
  const links = [
    { id: 0, name: "Home", icon: Home },
    { id: 20, name: "Games", icon: Gamepad2 },
    { id: 2, name: "Automobiles", icon: Car },
    { id: 17, name: "Sports", icon: Trophy },
    { id: 24, name: "Entertainment", icon: Clapperboard },
    { id: 28, name: "Technology", icon: Cpu },
    { id: 10, name: "Music", icon: Music },
    { id: 22, name: "Blogs", icon: FileText },
    { id: 25, name: "News", icon: Newspaper },
  ];
  const channels = [
    {
      name: "osamaelzero",
      alt: "osamaelzero",
    },
    {
      name: "javascriptmastery",
      alt: "javascriptmastery",
    },
    {
      name: "shadowcoding",
      alt: "shadowcoding",
    },
    {
      name: "freecodecamp",
      alt: "freecodecamp",
    },
    {
      name: "pedrotech",
      alt: "pedrotech",
    },
  ];
  const getCategoryNameFromLink = (name) => {
    return name;
  };
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="sidebar bg-[var(--bg-main)] px-3 pb-11">
        <div className="shortcutLinks">
          {links.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setCategory(getCategoryNameFromLink(item.id));
                setActiveIndex(item.id);
              }}
              title={item.name}
              className={`${
                activeIndex === item.id
                  ? "bg-gray-200 dark:bg-gray-600 flex items-center gap-3 p-2 rounded text-red-500"
                  : "side-link flex items-center gap-3 p-2 rounded  hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer my-1"
              }`}
            >
              <item.icon size={20} />
              {!isCollapsed ? <p>{item.name}</p> : ""}
            </div>
          ))}
        </div>

        <div className="subscribed mt-4 border-top border-r-0 border-l-0 border-b-0 border-1 border-[var(--border-color)] ">
          {!isCollapsed ? (
            <h3 className="font-bold pt-3">Subscriptions</h3>
          ) : (
            ""
          )}
          {channels.map((item, index) => (
            <div
              title={item.name}
              key={index}
              className="sideLink cursor-pointer hover:bg-gray-200 p-1  dark:hover:bg-gray-600 flex items-center gap-3 my-2"
            >
              <Avatar
                img={`https://avatars.githubusercontent.com/${item.name}`}
                alt={item.alt}
                rounded
                size="xs"
              />
              {!isCollapsed ? <p>{item.name}</p> : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
