import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import { createConsumer } from "@rails/actioncable";

document.addEventListener("DOMContentLoaded", () => {
    const cable = createConsumer('ws://localhost:3000/cable')
    // const cable = createConsumer('wss://spicord.herokuapp.com/cable');

    const root = document.getElementById("root");
    let preloadedState = undefined;
    if(window.currentUser) {
        preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser}
            },
            session: { id: window.currentUser.id }
        }
        delete window.currentUser;
    }
    const store = configureStore(preloadedState);
    ReactDOM.render(<Root store={store} cable={cable}/>, root);
});
