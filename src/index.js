import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';
import { ResultContextProvider } from "./context/ResultContextProvider";
import './global.css';

const container = document.getElementById('root');
const roott = createRoot(container);
roott.render(

    <ResultContextProvider>
        <Router>
            <App />
        </Router>
    </ResultContextProvider>

);
