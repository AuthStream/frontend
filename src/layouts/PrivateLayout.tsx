import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";

const Content = () => {
  const { isOpenSidebar } = useSidebar();

  return (
    <div
      className={`transition-all duration-300 flex-1 ${
        isOpenSidebar ? "ml-64" : "ml-0"
      }`}
    >
      <Outlet />
    </div>
  );
};

export default function PrivateLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 w-full z-20 bg-white shadow">
          <Header />
        </header>

        <div className="flex flex-1 mt-10">
          <aside
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-200 z-10 ${
              useSidebar().isOpenSidebar ? "w-64" : "w-0"
            } overflow-y-auto`}
          >
            <Sidebar />
          </aside>

          <div className="flex-1 w-full p-6">
            <Content />
          </div>
          <ToastContainer />
        </div>
      </div>
    </SidebarProvider>
  );
}
