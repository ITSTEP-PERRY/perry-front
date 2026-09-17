import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    watch: {
      ignored: ["**/My_Amazon2/**", "**/Back_end_for_our_poroject/**"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:5272",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5272",
        changeOrigin: true,
      },
    },
  },
});
