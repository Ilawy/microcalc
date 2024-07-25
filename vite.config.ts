import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tw from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tw()],
    },
  },
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
});
