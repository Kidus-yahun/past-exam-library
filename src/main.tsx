import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource/noto-sans-ethiopic/400.css";
import "@fontsource/noto-sans-ethiopic/600.css";
import "./index.css";
import { render } from "solid-js/web";
import { App } from "./app/App";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

render(() => <App />, root);
