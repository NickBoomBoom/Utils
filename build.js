// import fs from 'fs'
// fs.copyFileSync('./package.json', './dist/package.json')
// fs.copyFileSync('./README.md', './dist/README.md')
var build = require('esbuild').build;
build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/bundle.js',
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'esm',
    target: ['es2020']
})["catch"](function (err) {
    console.error(err);
    process.exit(1);
});
