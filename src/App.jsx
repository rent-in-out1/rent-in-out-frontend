import React from "react";
import { Provider } from 'react-redux';
import AppRoutes from "./appRoutes";
import "./index.css";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}`}>
            <Provider store={store}>
                <AppRoutes />
            </Provider>
        </GoogleOAuthProvider>
    );
}

export default App;
