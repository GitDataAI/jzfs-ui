import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import BasicSsl from "@vitejs/plugin-basic-ssl"

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    https: {

    },
    proxy: {
      "/api": {
        // target: "https://v1.jiaozifs.com/api/",
        target: "https://192.168.0.100:8080/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react(),BasicSsl()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Map the @ to the src directory
    },
  },
});
