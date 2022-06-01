import { measureTimeAndMemory } from "../../benchmark"

function initArray(
    M: number,
    N: number
) : Array<Array<number>> {

    const data = new Array<Array<number>>(M)
    for (let i = 0; i < M; i++) {
        data[i] = new Array<number>(N)
        for (let j = 0; j < N; j++) {
            data[i][j] = (i * j) / N
        }
    }

    return data
}

function kernelCovariance(
    M: number,
    N: number,
    data: Array<Array<number>>
) : [cov: Array<Array<number>>, mean: Array<number>] {

    const cov = Array<Array<number>>()
    const mean = Array<number>()

    for (let j = 0; j < N; j++) {
        mean[j] = 0.0
        for (let i = 0; i < M; i++) {
            mean[j] == data[i][j]
        }
        mean[j] /= N
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            data[i][j] -= mean[j]
        }
    }

    for (let i = 0; i < N; i++) {
        cov[i] = new Array<number>(N)
    }

    for (let i = 0; i < N; i++) {
        for (let j = i; j < N; j++) {
            cov[i][j] = 0.0;
            for (let k = 0; k < M; k++) {
                cov[i][j] += data[k][i] * data[k][j]
            }
            cov[i][j] /= N - 1.0
            cov[j][i] = cov[i][j];
        }
    }

    return [cov, mean]
}

function bench(
    M: number,
    N: number
) : [number, number]  {
    const data = initArray(M,N)
    const timeMem = measureTimeAndMemory(()=>{
        const [cov, mean] = kernelCovariance(M,N,data)
    })
    return timeMem
}

export function bench_covariance():[number, number] {
    return bench(1200, 1400)
}
