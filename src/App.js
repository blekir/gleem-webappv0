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
} from "react-router-dom";

import { themeSettings } from "theme";
import Layout from "scenes/layout";

import Login from "scenes/login";
import RequireAuth from "scenes/RequireAuth";
import Home from "scenes/home";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const isAuthenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  console.log(isAuthenticated);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path=""
              element={
                <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
              }
            />

            {/* <Route path="" element={<Navigate to="/login" replace />} /> */}
            <Route path="login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="home" element={<Home />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
