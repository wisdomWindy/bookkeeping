import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {URL,fileURLToPath} from 'node:url'
import path from 'path'
import fs from "fs/promises";
const __dirname = fileURLToPath(new URL('.',import.meta.url))
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-transform-react-jsx"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    include: /src\/.*\.jsx?$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
});
