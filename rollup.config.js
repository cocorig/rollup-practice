import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";
import { visualizer } from "rollup-plugin-visualizer";

import packageJson from "./package.json" assert { type: "json" };

const extensions = [".js", "jsx", ".ts", ".tsx"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm",
      },
    ],

    plugins: [
      peerDepsExternal(),
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      visualizer({
        filename: "./dist/report.html",
        open: true,
      }),
      babel({
        babelHelpers: "bundled",
        presets: [
          "@babel/preset-env",

          [
            "@babel/preset-react",
            {
              runtime: "automatic",
              importSource: "@emotion/react",
            },
          ],
          "@babel/preset-typescript",
        ],
        plugins: ["@emotion/babel-plugin"],
        extensions: extensions,
        exclude: "node_modules/**",
      }),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
