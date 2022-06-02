import { measureTimeAndMemory } from "../../../benchmark"

function initArray(
    N: number
) : Array<Array<number>> {
    const path = new Array<Array<number>>(N)

    for (let i =0; i < N; i++) {
        path[i] = new Array<number>(N)
        for (let j = 0; j < N; j++) {
            path[i][j] = (i * j % 7 + 1.0)
            if ((i + j) % 13 === 0 || (i + j) % 7 === 0 || (i + j) % 11 === 0) {
                path[i][j] = 999.0
            }
        }
    }

    return path
}

function kernelFloydWarshall(
    N: Number,
    path: Array<Array<number>>
): Array<Array<number>> {
    for (let k = 0; k < N; k++) {
        for (let i = 0; i < N; i++) {
            for(let j = 0; j < N; j++) {
                if (path[i][j] >= path[i][k] + path[k][j]) {
                    path[i][j] = path[i][k] + path[k][j]
                }
            }
        }
    }
    return path
}

function bench(
    N: number
): [number, number] {
    const path = initArray(N)
    const timeMem = measureTimeAndMemory(()=> {
        const path2 = kernelFloydWarshall(N, path)
    })
    return timeMem
}

export function benchFloydWarshall(): [number, number] {
    return bench(280)
}
