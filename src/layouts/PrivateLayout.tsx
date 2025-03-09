import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";

const Content = () => {
  const { isOpenSidebar } = useSidebar();

  return (
    <div
      className={`transition - all duration-300 flex-1 ${
        isOpenSidebar ? "ml-64" : "ml-0"
      } `}
    >
      <Outlet />
    </div>
  );
};
export default function PrivateLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full">
          <Header />

          <div className="flex-1 w-full mt-8 overflow-hidden">
            <Content />
          </div>
          <ToastContainer />
        </div>
      </div>
    </SidebarProvider>
  );
}
