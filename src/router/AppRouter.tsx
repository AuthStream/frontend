import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Application from "../pages/Application";
import Provider from "../pages/Provider";
import Token from "../pages/Token";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/application" element={<Application />} />
            <Route path="/provider" element={<Provider />} />
            <Route path="/token" element={<Token />} />
        </Routes>
    );
};

export default AppRouter;
