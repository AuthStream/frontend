import "./styles/App.css";
import AppRouter from "./router/AppRouter";
import Sidebar from "./components/Sidebar";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import Header from "./components/header";
import QueryProvider from "./provider/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = () => {
  const { isOpenSidebar } = useSidebar();

  return (
    <div
      className={`transition - all duration-300 flex-1 ${
        isOpenSidebar ? "ml-64" : "ml-0"
      } `}
    >
      <AppRouter />
    </div>
  );
};

function App() {
  return (
    <QueryProvider>
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
    </QueryProvider>
  );
}

export default App;
