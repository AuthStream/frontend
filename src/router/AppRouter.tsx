import { Navigate, useRoutes } from "react-router-dom";
import NotFound from "../pages/not-found/index";
import { FC } from "react";
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { JWT_LOCAL_STORAGE_KEY } from "../constants/data";

const SignedRoute: FC<{
  element: JSX.Element;
  requiredLogin: boolean;
}> = ({ element, requiredLogin }) => {
  const isAuthenticated = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
  if (!isAuthenticated && requiredLogin) {
    return <Navigate to="/signin" />;
  }

  if (isAuthenticated && !requiredLogin) {
    return <Navigate to="/" />;
  }

  return element;
};

const routes = [
  {
    element: <PrivateLayout />,
    children: [
      ...Object.values(PrivateRoute).map(({ path, component: Component }) => ({
        path,
        element: <SignedRoute element={<Component />} requiredLogin={true} />,
      })),
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      ...Object.values(PublicRoute).map(({ path, component: Component }) => ({
        path,
        element: <SignedRoute element={<Component />} requiredLogin={false} />,
      })),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const AppRouter: FC = () => {
  return useRoutes(routes);
  // return (
  //   <Routes>
  //     <Route path="/home" element={<Dashboard />} />
  //     <Route path="/about" element={<About />} />
  //     <Route path="/route" element={<ProtectedRoute />} />
  //     <Route path="/application" element={<Application />} />
  //     <Route path="/provider" element={<Provider />} />
  //     <Route path="/token" element={<Token />} />
  //     <Route path="/message" element={<Message />} />
  //     <Route path="/user" element={<User />} />
  //     <Route path="/role" element={<Role />} />
  //     <Route path="/group" element={<Group />} />
  //     <Route path="/permission" element={<Permission />} />
  //     <Route path="*" element={<NotFound />} />
  //   </Routes>
  // );
};

export default AppRouter;
