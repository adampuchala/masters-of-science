import { measureTimeAndMemory } from './benchmark'


function tsMain() {
    let collection: Array<string> = []
    let pow = Math.pow(10, 5)
    for(let idx = 0; idx < pow; idx++) {
        collection.push(`aabcc${idx}`)
    }
    let collection2: Array<string> = []
        for(let i = 0; i< collection.length; i++) {
            collection2.push(collection[i])
        }
}

// @ts-ignore
import('./../../pkg').then((module)=> {
    console.log(`webassembly ${module.run_wasm_benchmarks()}`)
    console.log(`webassembly polybench 3mm ${module.launch_3mm_polybench_benchmark()}`)
    console.log(`webassembly polybench covariance ${module.launch_covariance_polybench_benchmark()}`)
    console.log(`webassembly polybench syr2k ${module.launch_syr2k_polybench_benchmark()}`)
    console.log(`webassembly polybench ludcmp ${module.launch_ludcmp_polybench_benchmark()}`)
    console.log(`webassembly polybench floyd warshall ${module.launch_floyd_warshall_polybench_benchmark()}`)
    console.log(`webassembly polybench heat 3d ${module.launch_heat_3d_polybench_benchmark()}`)
})
