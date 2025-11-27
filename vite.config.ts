import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "force-copy-contact",
      closeBundle() {
        copyFileSync("public/contact.html", "dist/contact.html");
      },
    },
  ],
  publicDir: "public",
  build: {
    copyPublicDir: true,
  },
});
