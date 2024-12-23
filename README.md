# Rollup

<div>
	<img src="https://img.shields.io/badge/rollup.js-EC4A3F?style=for-the-badge&logo=rollup.js&logoColor=white">
</div>

저자는 React, TypeScript, Emotion을 이용한 UI 라이브러리를 만들고자 했고, 그 과정에서 npm에 패키지를 배포하는 방법을 검색하다 rollup이라는 번들링 도구를 알게 되었다. 이참에 rollup 개념과 패키지 배포를 위한 rollup 설정에 대해 공부한 내용을 정리해 보려 한다. 🚀

<br>

## [rollup](https://rollupjs.org/introduction/) 개념

`rollup`은 여러 모듈을 하나의 스코프로 결합하여 한 번에 번들링을 진행하는 방식으로, 번들 사이즈를 경량화하고 최적화하는 데 특화된 번들링 도구이다. 이러한 이유로 라이브러리 개발에 주로 사용된다.

주요 장점 중 하나는 `Tree-shaking` 기능으로, 사용되지 않는 코드를 자동으로 제거하여 최적화된 결과물을 생성할 수 있다. 또한, rollup은 ES 모듈을 기본으로 지원하며, 플러그인을 통해 CommonJS(CJS) 모듈을 ES6 코드로 변환하는 것도 가능하다.

`ES 모듈`은 Tree-shaking 및 스코프 호이스팅을 통해 최적화에 유리한 기능을 제공하므로, CommonJS 모듈보다 효율적인 번들링 결과를 생성할 수 있다. 이러한 이유로 라이브러리 개발에서는 ES 모듈과 rollup의 조합이 선호된다.

Webpack과 비교했을 때, `Webpack`은 대규모 애플리케이션에서 종속성 관리, 코드 분할, 다양한 로더 및 플러그인을 활용한 확장성 면에서 강점이 있다. Webpack은 V5부터 ES 모듈을 지원하며, 복잡한 애플리케이션 개발에서 주로 사용된다.

<br>

### [Tree-shaking](https://rollupjs.org/faqs/#what-is-tree-shaking)

Tree-shaking은 번들링 과정에서 사용하지 않는 코드(Dead Code)를 제거해 최종 파일 크기를 줄이는 최적화 기법이다.

아주 간단한 예시로 알아보자.

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// index.ts
import { add, multiply } from "./math";
console.log(add(2, 3));
```

math.ts에 세 가지 함수가 정의되어 있고, index.ts에선 add 함수만 사용해서 번들링을 진행해 보자.
그럼 다음과 같은 결과가 나온다.

```js
// index.js
console.log(2 + 3);
```

index.ts 파일에서 add 함수를 가져올 때 multiply 함수도 추가로 가져왔지만 실제로 사용되지 않기 때문에
Dead Code로 간주되어 최종 번들에서 제거된 것이다.

<br>

## rollup 설치

일단 rollup과 필요한 플러그인을 설치한다.

```bash
npm install rollup @rollup/plugin-terser @rollup/plugin-node-resolve  @rollup/plugin-commonjs  @rollup/plugin-typescript rollup-plugin-peer-deps-external  --save-dev
```

🔗 [rollup](https://www.npmjs.com/package/rollup) <br>
🔗 [@rollup/plugin-terser](https://www.npmjs.com/package/@rollup/plugin-terser) : 생성된 번들을 `압축`하는 플러그인
<br>

🔗 [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve) :`외부 모듈`에 대해서도 Tree-shaking을 적용해 주는 플러그인<br>
🔗 [ @rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs): CommonJS 모듈을 `ES 모듈`로 변환하는 플러그인 <br>
🔗 [@rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript): `TypeScript`를 처리하는 플러그인 <br>
🔗 [rollup-plugin-peer-deps-external](https://www.npmjs.com/package/rollup-plugin-peer-deps-external): `peerDependency`로 설치된 라이브러리들을 번들에서 제외하는 플러그인 <br>
🔗 [rollup-plugin-dts](https://www.npmjs.com/package/rollup-plugin-dts): TypeScript `타입 정의 파일`을 처리하는 플러그인
<br>

🔗 [@rollup/plugin-babel](https://www.npmjs.com/package/@rollup/plugin-babel) : rollup에서 `babel` 을 사용할 수 있게 해주는 플러그인

<br>

## package.json 설정

- 파일 생성

```bash
npm init -y
```

패키지를 `CJS`와 `ESM` 두 가지 모듈로 배포하려면, package.json 파일에 두 모듈에 맞는 `파일 경로`를 설정해야 한다.

```json
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "require": "./dist/cjs/index.js",
      "import": "./dist/esm/index.js"
    }
  }
}
```

- `main` : 빌드 결과 메인 파일, CJS 라이브러리 진입점.
- `module` : ESM 라이브러리 진입점.
- `types` : 번들링 된 라이브러리 타입을 지원하기 위한 d.ts 파일 경로, 타입 정의 파일 경로.
- `files` : 배포 시 포함할 파일이나 폴더 지정.
- `exports`: 외부에서 라이브러리 접근할 때의 경로 설정.

<br>

## rollup 설정

루트 디렉토리에 rollup.config.js 파일을 생성한다.

```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" };

const extensions = [".js", "jsx", ".ts", ".tsx"];

export default [
  {
    input: "src/index.ts", // 번들링 진입점
    output: [
      {
        file: packageJson.main, // CJS 모듈로 번들 된 파일 경로
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module, // ESM 모듈로 번들 된 파일 경로
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
  },
  // 타입 정의 파일을 하나로 통합하기 위해 dts 플러그인 사용
  {
    input: "dist/esm/index.d.ts", // 타입 정의 파일의 진입점
    output: [{ file: "dist/index.d.ts", format: "esm" }], // 최종 타입 정의 파일 경로
    plugins: [dts()],
  },
];
```

<br>

### 실행

번들링을 실행하려면 package.json 파일에 scripts를 추가해야 한다.

```json
 "scripts": {
    "build": "rollup -c ", // -c는 설정 파일을 지정하는 옵션
    "watch": "rollup -cw", // 파일 변경 시 자동으로 번들링을 다시 실행
  },
```

그다음 아래 명령어로 빌드를 시작한다.

```bash
npm run build
```

<br>

빌드가 완료되면, dist 폴더 안에 cjs와 esm 버전의 파일, 타입 정의 파일이 생성된다.

<div align="center">
<img width="100%"  src="https://github.com/user-attachments/assets/efc8ed2e-39f4-4a3e-8644-608e2d42b816" />

<img width="100%" src="https://github.com/user-attachments/assets/84edfe39-2694-4f13-bb73-432437b39d95" />
</div>

`cjs/index.js`: CommonJS 형식으로 번들링 된 결과 파일.
`esm/index.js`: ES 모듈(ESM) 형식으로 번들링 된 결과 파일.
`dist/index.d.ts`: 라이브러리의 모든 타입이 모인 최종 타입 정의 파일.

<br>

#### devDependencies, dependencies, peerDependencies 차이

- `devDependencies` : 개발 환경에서만 필요한 패키지들. 예를 들어, rollup, TypeScript, Babel 등 빌드 과정에 필요한 도구들. <br>
- `dependencies` : 실제 라이브러리가 동작하는 데 필요한 패키지들 <br>
- `peerDependencies` : 라이브러리를 만들 때 설치한 패키지가 이 라이브러리를 설치할 프로젝트에 같은 패키지가 있을 경우, 패키지를 설치하는 프로젝트에서 해당 의존성을 설치하도록 할 때 peerDependencies에 패키지를 정의할 수 있다.
  <br>
