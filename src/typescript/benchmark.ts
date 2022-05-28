
export function measureTimeAndMemory(block: ()=>void): [number, number] {
    const memory_before = getMemoryConsumption()
    const start = performance.now()
    block()
    const end = performance.now()
    const memory_after = getMemoryConsumption()
    let consumption = -1;
    if (memory_before !==null) {
        consumption = memory_after - memory_before
    }
    return [end - start, memory_after - memory_before]
}

function getMemoryConsumption(): number {
    // @ts-ignore
    const mem  = performance.memory
    let usedHeap = null
    if (mem !== undefined) {
        usedHeap = mem.totalJSHeapSize
    }
    return usedHeap
}
