import { glob } from "glob";
import path from "path";

import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import image from "@rollup/plugin-image";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
//import { litScss } from 'rollup-plugin-scss-lit'

const entryPoints = glob.sync("src/**/index.ts", { 
  ignore: ["src/wait/**"] 
});
console.log(`\r\n 엔트리 포인트 목록 \r\n`);
console.log(entryPoints);

const dependencies = Object.keys(require('./package.json').dependencies);
console.log(`\r\n 의존성 패키지 목록 \r\n`);
console.log(dependencies);

/** @type {import('rollup').RollupOptions} */
const rollup = {
  input: entryPoints,

  // 빌드시 생성되는 파일 설정
  // cjs와 esm으로 빌드
  // preserveModules: src폴더의 구조를 유지하면서 빌드
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  ],

  plugins: [

    // 별칭 설정
    alias({
      entries: [
        { find: "@iyulab/modern-app", replacement: path.resolve(__dirname, "src") }
      ]
    }),

    // 이미지 파일을 불러와서 사용할 수 있게 해줌
    image(),

    // node_modules의 모듈을 불러와 같이 빌드 해줌
    resolve(),
    
    // CommonJS 모듈을 ES6로 변환
    commonjs(),

    // typescript 지원
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json")
    }),
    
    // json 파일을 불러와서 사용할 수 있게 해줌
    json(),

    // lit-element에서 가져온 scss를 js로 변환
    // 다른 scss플러그인과 충돌하므로 path지정
    // litScss({
    //   include: [
    //     'src/components/lit/**/*.scss'
    //   ],
    //   minify: true
    // }),
    
    // 기본 postcss설정
    // litScss와 충돌하므로 path 지정
    postcss({
      include: [
        //'src/components/react/**/*.scss',
        'src/styles/**/*.scss',
        'src/styles/**/*.css',
      ],
      modules: true,
      use: ['sass'],
      plugins: [
        require('autoprefixer'), // 자동으로 브라우저 접두사를 추가해 줍니다.
        require('tailwindcss'), // tailwindcss를 사용합니다.
        require('cssnano')({
          preset: 'default', // 기본 압축 설정을 사용합니다.
        }),
        require('postcss-nested'), // 중첩된 CSS 문법을 일반 CSS로 변환합니다(sass의 중첩기능을 css에도 구현).
      ],
      minimize: false,
      extract: true,
    }),

    // 빌드시 코드 설정
    terser({
      compress: true, // 코드 압축
      mangle: true, // 변수 이름 난독화
      output: {
        comments: false, // 모든 주석 제거
      }
    }),

  ],

  // 같이 빌드하지 않을 패키지 설정
  external: [
    "lit/decorators.js",
    "@microsoft/fast-element",
    "react/jsx-runtime",
    "react-dom/client",
    ...dependencies // 모든 의존성 패키지
  ],
  
};

export default rollup;