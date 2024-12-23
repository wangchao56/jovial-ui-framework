/// <reference types="histoire" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  histoire: {
    // Histoire config can also go here
    vite: {
      optimizeDeps: {
        include: ["@vicons/material"], // 显式列出需要优化的依赖
      },
      server: {
        watch: {
          usePolling: true,
          interval: 1000, // 1秒
        },
      },
    },
  },
});
