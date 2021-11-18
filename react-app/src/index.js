import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import { UseModalProvider } from "./context/UseModal";
import { NewModalProvider } from "./context/NewModal";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NewModalProvider>
        <ModalProvider>
          <UseModalProvider>
            <App />
          </UseModalProvider>
        </ModalProvider>
      </NewModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
