import * as Benchmark from "benchmark";

const suite = new Benchmark.Suite();

function tsMain() {
    let collection: Array<string> = []
    let pow = Math.pow(10, 3)
    for(let idx = 0; idx < pow; idx++) {
        collection.push(`aabcc${idx}`)
    }
    let collection2: Array<string> = []
        for(let i = 0; i< collection.length; i++) {
            collection2.push(collection[i])
        }
    collection2.reduce((x,y,z, g)=>x+y)
}

// @ts-ignore
import('./../../pkg').then((module)=> {
    try {
        suite
    .add("WASM", () => {
        module.run_wasm_benchmarks()
    })
    .add("JS", () => {
       tsMain()
    })
    .on('cycle', (event: Event)=> {
        console.log(String(event.target));
      })
    .run();
    } catch (e: any) {}
    
})
