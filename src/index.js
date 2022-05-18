import React from "react";
import * as ReactDOMClient from "react-dom/client"
import MyApp from "./MyApp";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<MyApp/>)