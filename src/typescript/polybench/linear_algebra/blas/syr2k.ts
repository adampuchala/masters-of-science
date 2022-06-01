import { measureTimeAndMemory } from "../../../benchmark"

function initArray(
    M: number,
    N: number
) : [alpha: number, beta: number, C: Array<Array<number>>, A: Array<Array<number>>, B: Array<Array<number>>] {

    const alpha = 1.5
    const beta = 1.2

    const C = new Array<Array<number>>(M)
    const A = new Array<Array<number>>(M)
    const B = new Array<Array<number>>(M)

    for (let i = 0; i< M; i++) {
        A[i] = new Array<number>(N)
        B[i] = new Array<number>(N)
        for (let j = 0; j< N; j++) {
            A[i][j] = ((i * j + 1) % M) / M
            B[i][j] = ((i * j + 2) % N) / N
        }
    }

    for (let i = 0; i < M; i++) {
        C[i] = new Array<number>(M)
        for (let j = 0; j < M; j++ ) {
            C[i][j] = ((i * j + 3) % M) / N
        }
    }

    return [alpha, beta, C, A, B]
}

function kernelSyr2k(
    M: number,
    N: number,
    alpha: number,
    beta: number,
    C: Array<Array<number>>,
    A: Array<Array<number>>,
    B: Array<Array<number>>,
): Array<Array<number>> {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j <= i; j++) {
            C[i][j] *= beta
        }
        for (let k = 0; k < N; k++) {
            for (let j = 0; j <= i; j++) {
                C[i][j] += A[j][k] * alpha * B[i][k] + B[j][k] * alpha * A[i][k]
            }
        }
    }
    return C
}

function bench(
    M: number,
    N: number,
): [number, number] {
    const [alpha, beta, C, A, B] = initArray(M, N)
    const memTime = measureTimeAndMemory(()=>{
        const c = kernelSyr2k(M,N,alpha,beta, C, A, B)
    })
    return memTime
}

export function benchSyr2k(): [number, number] {
    return bench(
        1000, 1200
    )
}
