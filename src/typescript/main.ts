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
    console.log(`webassembly polybench ${module.launch_poly_benchmark()}`)
    console.log(`js ${measureTimeAndMemory(()=>tsMain())}`)
})
