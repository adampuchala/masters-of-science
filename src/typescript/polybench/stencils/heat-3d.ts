import { measureTimeAndMemory } from "../../benchmark"

function initArray(
    N: number
): [A: Array<Array<Array<number>>>, B: Array<Array<Array<number>>>] {
    
    const A = new Array<Array<Array<number>>>(N)
    const B = new Array<Array<Array<number>>>(N)
    for (let i = 0; i < N; i++) {
        A[i] = new Array<Array<number>>(N)
        B[i] = new Array<Array<number>>(N)
        for (let j = 0; j < N; j++) {
            A[i][j] = new Array<number>(N)
            B[i][j] = new Array<number>(N)
            for (let k = 0; k < N; k++) {
                B[i][j][k] = (i + j + (N - k)) * 10.0 / N
            }
        }
    }
    return [A, B]
}

function kernelHeat3D(
    N: number,
    TSTEPS: number,
    A: Array<Array<Array<number>>>,
    B: Array<Array<Array<number>>>
): [A: Array<Array<Array<number>>>, B: Array<Array<Array<number>>>] {
    for (let ff = 1; ff < TSTEPS; ff++) {
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; j < N - 1; k++) {
                    B[i][j][k] = 0.125 * (A[i + 1][j][k] - 2.0 * A[i][j][k] + A[i - 1][j][k])
                        + 0.125 * (A[i][j + 1][k] - 2.0 * A[i][j][k] + A[i][j - 1][k])
                        + 0.125 * (A[i][j][k + 1] - 2.0 * A[i][j][k] + A[i][j][k - 1])
                        + A[i][j][k]
                }
            }
        }
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; j < N - 1; k++) {
                    A[i][j][k] = 0.125 * (B[i + 1][j][k] - 2.0 * B[i][j][k] + B[i - 1][j][k])
                        + 0.125 * (B[i][j + 1][k] - 2.0 * B[i][j][k] + B[i][j - 1][k])
                        + 0.125 * (B[i][j][k + 1] - 2.0 * B[i][j][k] + B[i][j][k - 1])
                        + B[i][j][k]
                }
            }
        }
    }
    return [A, B]
}

function bench(
    N: number,
    TSTEPS: number
): [number, number] {
    const [A, B] = initArray(N)
    const timeMem = measureTimeAndMemory(()=> {
        const [Ar, Br] = kernelHeat3D(N, TSTEPS, A, B)
    })
    return timeMem
}

export function benchHeat3D(): [number, number] {
    return bench(120, 50)
}
