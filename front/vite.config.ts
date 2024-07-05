import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Diretório de saída para build
    rollupOptions: {
      input: "/index.html", // Arquivo de entrada principal
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
