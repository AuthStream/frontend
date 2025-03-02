import { useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
  const { isOpenSidebar } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    application: false,
    event: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div
      className={`absolute left-0 top-16 h-screen bg-gray-100 dark:bg-background dark:text-white border transition-all duration-200 ${
        isOpenSidebar ? "w-64 p-4" : "w-0 p-0 overflow-hidden"
      }`}
    >
      {isOpenSidebar && (
        <>
          <h2 className="text-xl dark:text-white font-bold mb-4 border-b-2 pb-2">
            Menu
          </h2>
          <nav className="space-y-2">
            <Link
              to="/home"
              className={`block px-4 py-2 dark:text-white rounded border-b-2 border-gray-200 ${
                isActive("/home") ? "font-bold text-blue-500" : "text-black"
              }`}
            >
              Dashboard
            </Link>

            {/* Application Dropdown */}
            <div
              className={`px-4 py-2 cursor-pointer rounded flex items-center justify-between border-b-2 border-gray-200 ${
                isActive("/application") || isActive("/provider")
                  ? "font-bold text-blue-500"
                  : "text-black"
              }`}
              onClick={() => toggleMenu("application")}
            >
              <span>Application</span>
              {openMenus.application ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {openMenus.application && (
              <div className="ml-4 space-y-1">
                <Link
                  to="/application"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/application")
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                >
                  Application
                </Link>
                <Link
                  to="/provider"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/provider")
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                >
                  Provider
                </Link>
              </div>
            )}

            <div
              className={`px-4 py-2 cursor-pointer rounded flex items-center justify-between border-b-2 border-gray-200 ${
                isActive("/directory-services")
                  ? "font-bold text-blue-500"
                  : "text-black"
              }`}
              onClick={() => toggleMenu("event")}
            >
              <span>Event</span>
              {openMenus.event ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {openMenus.event && (
              <div className="ml-4 space-y-1">
                <Link
                  to="/message"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/directory-services")
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                >
                  Message
                </Link>
              </div>
            )}

            {/* Directory Dropdown */}
            <div
              className={`px-4 py-2 cursor-pointer rounded flex items-center justify-between border-b-2 border-gray-200 ${
                isActive("/token") || isActive("/user")
                  ? "font-bold text-blue-500"
                  : "text-black"
              }`}
              onClick={() => toggleMenu("directory")}
            >
              <span>Directory</span>
              {openMenus.directory ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {openMenus.directory && (
              <div className="ml-4 space-y-1">
                <Link
                  to="/token"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/token")
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                >
                  Token
                </Link>
                <Link
                  to="/user"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/user") ? "font-bold text-blue-500" : "text-black"
                  }`}
                >
                  User
                </Link>
                <Link
                  to="/role"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/role") ? "font-bold text-blue-500" : "text-black"
                  }`}
                >
                  Role
                </Link>
                <Link
                  to="/group"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/group")
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                >
                  Group
                </Link>
                <Link
                  to="/permission"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/permission")
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                >
                  Permission
                </Link>
                <Link
                  to="/route"
                  className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                    isActive("/group")
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                >
                  Route
                </Link>
              </div>
            )}

            <Link
              to="/about"
              className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                isActive("/about") ? "font-bold text-blue-500" : "text-black"
              }`}
            >
              About
            </Link>
            <Link
              to="/documentations"
              className={`block px-4 py-2 rounded border-b-2 border-gray-200 ${
                isActive("/documentations")
                  ? "font-bold text-blue-500"
                  : "text-black"
              }`}
            >
              Documentations
            </Link>
          </nav>
        </>
      )}
    </div>
  );
};

export default Sidebar;
