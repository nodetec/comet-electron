import React from "react";

import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div>
        <h1>💖 Hello from React!</h1>
      </div>
    </React.StrictMode>
  );
}
