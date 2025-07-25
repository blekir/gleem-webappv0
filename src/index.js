import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { STORE, PERSISTOR } from "./api/reducer";

import { SnackbarProvider } from "notistack";

import { SSEProvider } from "contexts/SSEContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={STORE}>
      <PersistGate
        loading={null}
        persistor={PERSISTOR}
        onBeforeLift={() => {
          const persistState = localStorage.getItem("persist:root");
          if (!persistState) {
            STORE.dispatch({ type: "RESET_STATE" });
          }
        }}
      >
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <SSEProvider>
            <App />
          </SSEProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
