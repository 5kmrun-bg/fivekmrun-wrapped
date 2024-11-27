import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,
    // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
    proxy: {
      // Match the endpoint you want to proxy
      "/api": {
        // Target host
        target: "https://5kmrun.bg/",
        changeOrigin: true,
      },
    },
  },
});
