import React from "react";
import { render } from "react-dom";

import App from "./App";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
