// import fs from 'fs'
// fs.copyFileSync('./package.json', './dist/package.json')
// fs.copyFileSync('./README.md', './dist/README.md')

const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'], // 替换为你的入口文件路径
  outfile: 'dist/index.js', // 替换为输出文件的路径和名称
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'esm',
  target: ['es2020'],
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
