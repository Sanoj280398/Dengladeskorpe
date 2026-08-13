import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  root: path.resolve(__dirname, "sites", "www"),
  plugins: [react()],
  server: {
    proxy: {
      "/auth": "http://localhost:3042",
      "/users": "http://localhost:3042",
      "/user": "http://localhost:3042",
      "/dishes": "http://localhost:3042",
      "/dish": "http://localhost:3042",
      "/messages": "http://localhost:3042",
      "/message": "http://localhost:3042",
      "/orders": "http://localhost:3042",
      "/order": "http://localhost:3042",
      "/ingredients": "http://localhost:3042",
      "/ingredient": "http://localhost:3042",
      "/employees": "http://localhost:3042",
      "/employee": "http://localhost:3042",
      "/categories": "http://localhost:3042",
      "/category": "http://localhost:3042",
    },
  },
  build: {
    outDir: path.resolve(__dirname, "sites", "www", "dist"),
    emptyOutDir: true,
  },
  publicDir: path.resolve(__dirname, "public"),
  base: "/",
});
