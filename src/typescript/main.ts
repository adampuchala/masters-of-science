import init from "./wasm-module/js_rust_benchmarks.js";
import { matrix_multiplication, display_simple_matrix } from "./wasm-module/js_rust_benchmarks.js";
import { Matrix } from "./matrix-multiplication.js"
import { measureExecution } from "./performance-utils.js";

function tsMain() {
    console.log("Javascript main: ")

    let matrix1 = new Matrix(3, 3, [1.324, 2.64, 3.3434, 4.345, 5.3434, 6.34634643, 7.3463, 8.34, 9.34])
    let matrix2 = new Matrix(3, 3, [1.34634, 2.34634, 3.34634643, 4.346, 5.76, 6.456, 7.456854, 8.4565, 9.56856])

    let m3 = new Matrix(5, 2, [1.675, 2.456, 3.4564, 4.46, 5.4564564, 6.456, 7.45, 8.34, 9.345, 10.346]);
    let m4 = new Matrix(1, 5, [1.3463, 2.346346, 3.346436, 4.346, 5.34634634]);

    const time = measureExecution(()=> {
        for(let i=0; i<1000000; i++) {
            matrix1.mutiply(matrix2)
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
    for(let i=0; i< 5; i++) {
        tsMain()
        wasmMain()
    }
});
