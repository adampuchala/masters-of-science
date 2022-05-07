import { Matrix } from "./matrix-multiplication"
import { measureExecution } from "./performance-utils";
import {analytics} from "./firebase_analytics"
import { logEvent } from "firebase/analytics";

function tsMain() {
    console.log("Javascript main: ")
    logEvent(analytics, 'js-start', {})
    let matrix1 = new Matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    let matrix2 = new Matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9])

    let m3 = new Matrix(5, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let m4 = new Matrix(1, 5, [1, 2, 3, 4, 5]);

    const time = measureExecution(()=> {
        for(let i=0; i<10; i++) {
            matrix1.mutiply(matrix2)
            m3.mutiply(m4)
        }
    })
    console.log(`JS time: ${time}`)
    logEvent(analytics, 'js-end', {})
}

// function wasmMain() {
//     logEvent(analytics, 'wasm-start', {})
//     matrix_multiplication()
//     logEvent(analytics, 'wasm-end', {})
// }

// @ts-ignore
import('./../../pkg').then((module)=> {
    module.matrix_multiplication()
})
// .then(() => {
//     for(let i=0; i< 5; i++) {
//         tsMain()
//         wasmMain()
//     }
// });
