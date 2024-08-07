import {Navigate, useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "../utils/Index.jsx";
import {useSelector} from "react-redux";

const Home = lazy(() => import("./home/Home.jsx"))
const Auth = lazy(() => import("./auth/Auth.jsx"))
const Login = lazy(() => import("./auth/login/Login.jsx"))
const Register = lazy(() => import("./auth/register/Register.jsx"))
const Dashboards = lazy(() => import("./dashboard/Dashboard.jsx"))
const Products = lazy(() => import("./dashboard/products/Products.jsx"))
const Users = lazy(() => import("./dashboard/users/Users.jsx"))
const Protected = lazy(() => import("./protected/Protected.jsx"))

const RouteController = () => {
  const authData = useSelector(state => state)
  return useRoutes([
    {
      path: "",
      element: <Suspense><Home/></Suspense>
    },
    {
      path: "auth",
      element: authData.token ? <Navigate to="/dashboard"/>: <Suspense><Auth/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Login/></Suspense>
        },
        {
          path: "register",
          element: <Suspense><Register/></Suspense>
        }
      ]
    },
    {
      path: "dashboard",
      element: <Suspense><Protected/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Dashboards/></Suspense>,
          children: [
            {
              path: "",
              element: <Suspense><Products/></Suspense>
            },
            {
              path: "users",
              element: <Suspense><Users/></Suspense>
            }
          ]
        }
      ]
    }
  ])
}
export default RouteController
