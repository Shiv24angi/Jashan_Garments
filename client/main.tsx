import { createRoot, Root } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement & { __root?: Root };

if (!rootElement) {
  throw new Error("Root element not found");
}

// Reuse root if it already exists, otherwise create a new one
const root = rootElement.__root || createRoot(rootElement);
rootElement.__root = root;

root.render(<App />);
