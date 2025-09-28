import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init({
  duration: 800,
  once: true,
  easing: "ease-out",
});

createRoot(document.getElementById("root")!).render(<App />);
