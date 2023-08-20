import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import {store} from './redux/store';
import "./index.css";
// persist
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);