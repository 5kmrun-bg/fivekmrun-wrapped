import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
    proxy: {
      // Match the endpoint you want to proxy
      "/api": {
        // Target host
        target: "https://5kmrun.bg/",
        changeOrigin: true,
        // rewrite: (path) => {
        //   const result = path.replace(/^\/api/, "/api/5kmrun");
        //   return result;
        // },
      },
    },
  },
});
