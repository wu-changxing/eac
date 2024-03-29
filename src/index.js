// src/index.js
import { createRoot } from "react-dom";
import App from "./App";
import {enableHotReload} from "./hotreload";

const container = document.getElementById("app");
const root = createRoot(container);
// enableHotReload();
root.render(<App />);
// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept();
}

// // check if the browser supports service workers and register the service worker
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register(new URL('./serviceWorker.js', import.meta.url))
//             .then(function(registration) {
//                 // Registration was successful
//                 console.log('ServiceWorker registration successful with scope: ', registration.scope);
//             }, function(err) {
//                 // registration failed :(
//                 console.log('ServiceWorker registration failed: ', err);
//             });
//     });
// }
