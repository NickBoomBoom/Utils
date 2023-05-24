// import fs from 'fs'
// fs.copyFileSync('./package.json', './dist/package.json')
// fs.copyFileSync('./README.md', './dist/README.md')


const {build} = require('esbuild')
build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'esm',
    target: ['es2020']
}).catch(err=> {
    console.error(err);
    process.exit(1);

})
 