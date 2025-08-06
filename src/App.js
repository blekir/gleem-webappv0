/* eslint-disable no-unused-vars */
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { themeSettings } from "theme";
import Layout from "scenes/layout";

import Login from "scenes/login";
import RequireAuth from "scenes/RequireAuth";
import Home from "scenes/home";
import Orders from "scenes/orders";
import Tester from "scenes/Tester";
import Join from "scenes/register";

import Paywall from "scenes/paywall";
import Return from "scenes/paywall/Return";
import CheckoutForm from "scenes/paywall/CheckoutForm";
import Settings from "scenes/settings";
import useGetUserData from "hooks/useGetUserData";

function App() {
  const { fetchUserData } = useGetUserData();

  const mode = useSelector((state) => state.global.mode);
  const isAuthenticated = useSelector(
    (state) => state.authentication.user.authenticated
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const appearance = {
    theme: "stripe",
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AppRoutes isAuthenticated={isAuthenticated} />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

function AppRoutes({ isAuthenticated }) {
  const location = useLocation();

  return (
    <Routes>
      <Route
        path=""
        element={
          <Navigate to={isAuthenticated ? "/create" : "/login"} replace />
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="join" element={<Join />} />
      <Route path="join/:token" element={<Join />} />

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route key={location.pathname} path="create" element={<Home />} />
          <Route
            key={location.pathname}
            path="/product/:productId"
            element={<Home />}
          />
          <Route key={location.pathname} path="orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<Orders />} />
          <Route key={location.pathname} path="paywall" element={<Paywall />} />
          {/* <Route key={location.pathname} path="test" element={<Tester />} /> */}
          <Route path="/checkout/" element={<CheckoutForm />} />
          <Route path="/return" element={<Return />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
