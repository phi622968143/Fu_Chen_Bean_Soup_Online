import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: { port: 1140 },
  resolve: {
    alias: {
      // 2. 設定 @ 符號對應到 src 資料夾
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
