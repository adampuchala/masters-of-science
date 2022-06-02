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
const worker = new Worker(new URL('./benchWorker.ts', import.meta.url));