import React from "react";
import ReactDom from "react-dom";

import "./styles.scss";

const root = document.querySelector("#root");

ReactDom.render(React.createElement("h1", {}, "Stars Game"), root);
