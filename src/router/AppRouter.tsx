import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Application from "../pages/Application";
import Provider from "../pages/Provider";
import Token from "../pages/Token";
import NotFound from "../pages/not-found/index";
import Message from "../pages/Message";
import User from "../pages/User";
import Role from "../pages/Role";
import Group from "../pages/Group";
import Permission from "../pages/Permission";
import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/application" element={<Application />} />
      <Route path="/provider" element={<Provider />} />
      <Route path="/token" element={<Token />} />
      <Route path="/message" element={<Message />} />
      <Route path="/user" element={<User />} />
      <Route path="/role" element={<Role />} />
      <Route path="/group" element={<Group />} />
      <Route path="/permission" element={<Permission />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
