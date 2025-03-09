import React from "react";

import ReactDOM from "react-dom/client";
import { Button } from "./components/ui/button";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div className="bg-amber-500">
        <h1>💖 Hello from React!</h1>
        <Button>Click me!</Button>
      </div>
    </React.StrictMode>
  );
}
