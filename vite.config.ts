import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const base = process.env.VITE_BASE_PATH ?? "/";
const devHost = process.env.VITE_DEV_HOST ?? "127.0.0.1";
const requestedDevPort = Number.parseInt(process.env.VITE_DEV_PORT ?? "8080", 10);
const devPort = Number.isFinite(requestedDevPort) ? requestedDevPort : 8080;
const hmrOverlay = process.env.VITE_HMR_OVERLAY !== "false";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base,
  server: {
    host: devHost,
    port: devPort,
    hmr: {
      overlay: hmrOverlay,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
