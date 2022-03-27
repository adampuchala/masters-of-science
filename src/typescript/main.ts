import init from "./wasm-module/js_rust_benchmarks.js";
import matrix_multiplication from "./wasm-module/js_rust_benchmarks.js";
import { test_m } from "./wasm-module/js_rust_benchmarks.js";

function wasmMain() {
    test_m()
    matrix_multiplication()
}
init()
.then(() => {
    wasmMain();
});
