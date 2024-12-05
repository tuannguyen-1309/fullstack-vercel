import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </StrictMode>
);
