import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store, { persistor } from '@store'
// PersistGate的作用是向下分发persistStore对象；
import { PersistGate } from 'redux-persist/lib/integration/react'

import App from "./APP";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <ConfigProvider locale={zh_CN}> */}
            <App />
          {/* </ConfigProvider> */}
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);