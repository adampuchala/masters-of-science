#!/bin/zsh

npm run test
npx tsc -b
cargo test
wasm-pack build --target web --out-dir ./static/script/wasm-module
rm ./static/script/wasm-module/package.json
mkdir -p ./src/typescript/wasm-module
mv ./static/script/wasm-module/*.ts ./src/typescript/wasm-module
rm ./static/script/wasm-module/.gitignore
