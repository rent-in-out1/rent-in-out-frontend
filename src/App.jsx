import React from "react";
import { Provider } from 'react-redux';
import AppRoutes from "./appRoutes";
import "./index.css";
import store from "./redux/store";
// test
function App() {
    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    );
}

export default App;
