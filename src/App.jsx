import React from "react";
import { Provider } from 'react-redux';
import AppRoutes from "./appRoutes";
import "./index.css";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId="147486987874-arr7g0b2u38drkrjrg5ri67gm731vr8r.apps.googleusercontent.com">
            <Provider store={store}>
                <AppRoutes />
            </Provider>
        </GoogleOAuthProvider>
    );
}

export default App;
