import "./styles/App.css";
import AppRouter from "./router/AppRouter";
import QueryProvider from "./provider/QueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
