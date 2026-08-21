import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This builds the React Lab as a standalone, self-contained bundle
// (React + ReactDOM included) that the existing static portfolio loads
// with a plain <script> tag — no module loader, no dev server required
// in production. Output lands in ../assets/react-lab/ so it sits
// alongside the portfolio's other static assets.
export default defineConfig({
  plugins: [react()],
  // Vite's default `process.env.NODE_ENV` replacement is skipped whenever
  // `build.lib` is set, because library builds are normally consumed by a
  // downstream bundler that performs that replacement itself. This bundle,
  // however, is not consumed by another bundler — it's a self-contained
  // IIFE loaded directly by the browser via a <script> tag. Without this
  // define, React/ReactDOM's `process.env.NODE_ENV !== "production"` dev
  // checks are shipped untouched, so the browser throws
  // "process is not defined" the moment the bundle runs. Defining it here
  // lets esbuild/Rollup replace the reference at build time and dead-code
  // eliminate the unused dev-only branches, so no runtime `process` global
  // is required and no browser polyfill is needed.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "../assets/react-lab",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: "src/main.jsx",
      name: "PortfolioReactLab",
      formats: ["iife"],
      fileName: () => "react-lab.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "react-lab.css",
      },
    },
  },
});
