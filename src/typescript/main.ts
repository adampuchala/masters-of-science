import init from "./wasm-module/js_rust_benchmarks.js";
import { matrix_multiplication, display_simple_matrix } from "./wasm-module/js_rust_benchmarks.js";
import { Matrix } from "./matrix-multiplication.js"
import { measureExecution } from "./performance-utils.js";

function tsMain() {
    console.log("Javascript main: ")
    const time = measureExecution(()=> {
        for(let i=0; i<10000000; i++) {
            let matrix1 = new Matrix(3, 3, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0])
            let matrix2 = new Matrix(3, 3, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0])
            matrix1.mutiply(matrix2)
    
            let m3 = new Matrix(5, 2, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]);
            let m4 = new Matrix(1, 5, [1.0, 2.0, 3.0, 4.0, 5.0]);
            m3.mutiply(m4)
        }
    })
    console.log(`JS time: ${time}`)
}


function wasmMain() {
    matrix_multiplication()
}
init()
.then(() => {
    tsMain()
    wasmMain()
});
