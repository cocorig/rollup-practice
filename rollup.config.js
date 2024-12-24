import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import fs from "fs";
import path from "path";

const extensions = [".js", "jsx", ".ts", ".tsx"];

// 공통 플러그인 설정
const commonPlugins = [
  resolve({ extensions }),
  commonjs(),
  terser(),
  peerDepsExternal(),
  typescript({ tsconfig: "./tsconfig.json" }),
];

// 공통 Output 설정
const commonOutputOptions = {
  preserveModules: true,
  preserveModulesRoot: "src",
};

// external 옵션
const externalDependencies = [/node_modules/, /react/, /@emotion/];

/**
 * 디렉토리 내에서 index.ts와 index.tsx 파일만 찾는 함수
 * @param {string} dir - 탐색할 디렉토리
 * @returns {string[]} - index.ts와 index.tsx 파일 경로 리스트
 */
const findIndexFiles = (dir) => {
  const results = [];
  const stack = [dir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        stack.push(filePath);
      } else if (/^index\.(ts|tsx)$/.test(file)) {
        results.push(filePath);
      }
    }
  }
  return results;
};

const srcDir = "src";
const indexFiles = findIndexFiles(srcDir);
console.log(indexFiles);
export default [
  {
    input: [...indexFiles],
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        ...commonOutputOptions,
      },

      {
        dir: "dist/esm",
        format: "esm",
        ...commonOutputOptions,
      },
    ],
    external: externalDependencies,
    plugins: [...commonPlugins],
  },

  // types
  {
    input: ["src/index.ts"],
    output: [
      {
        dir: "dist/types",
        format: "esm",
      },
    ],
    external: externalDependencies,
    plugins: [
      ...commonPlugins,
      typescript({
        declarationDir: "dist/types",
        declaration: true,
      }),
    ],
  },
];
