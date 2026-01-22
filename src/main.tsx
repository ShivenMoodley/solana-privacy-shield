import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Polyfills required by Solana/web3 + wallet adapter stack in production builds
// (Vite doesn't provide Node globals by default)
import { Buffer } from "buffer";
import process from "process";

(globalThis as any).Buffer = Buffer;
(globalThis as any).process = process;
(globalThis as any).global = globalThis;

createRoot(document.getElementById("root")!).render(<App />);
