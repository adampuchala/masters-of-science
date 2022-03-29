function performanceNow(): number {
    return window.performance.now()
}

export function measureExecution(f: () => void) {
    const start = performanceNow()
    f()
    const end = performanceNow()
    return end - start
}