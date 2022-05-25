import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app";

const Root = ({ store, cable }) => (
    <Provider store={store}>
        <HashRouter>
            <App cable={cable}/>
        </HashRouter>
    </Provider>
);

export default Root;