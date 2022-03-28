import init from "./wasm-module/js_rust_benchmarks.js";
import { matrix_multiplication, display_simple_matrix } from "./wasm-module/js_rust_benchmarks.js";
import { Matrix } from "./matrix-multiplication.js"


function tsMain() {
    console.log("Javascript main: ")
    let matrix1 = new Matrix(3, 3, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0])
    let matrix2 = new Matrix(3, 3, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0])
    let mulResult = matrix1.mutiply(matrix2)
    console.log(mulResult.toString())
}


function wasmMain() {
    console.log("Webassembly main: ")
    display_simple_matrix()
    matrix_multiplication()
}
init()
.then(() => {
    tsMain()
    wasmMain()
});
