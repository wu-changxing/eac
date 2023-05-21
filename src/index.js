import { createRoot } from "react-dom/client";
import App from "./App"; // changed from 'APP' to 'App'

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
