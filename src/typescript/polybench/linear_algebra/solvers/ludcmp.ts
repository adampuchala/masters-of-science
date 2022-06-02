import { measureTimeAndMemory } from "../../../benchmark"

function initArray(
    N: number
) : [A: Array<Array<number>>, b: Array<number>, x: Array<number>, y: Array<number>] {

    let A = new Array<Array<number>>(N)
    const b = new Array<number>(N)
    const x = new Array<number>(N)
    const y = new Array<number>(N)

    for (let i = 0; i < N; i++) {
        x[i] = 0.0
        y[i] = 0.0
        b[i] = (i+1) / N / 2.0 + 4.0
    }

    for (let i = 0; i < N; i++) {
        A[i] = new Array<number>(N)
        for (let j = 0; j <= i; j++) {
            A[i][j] = (-j % N) / N + 1.0
        }
        for (let j = i + 1; j < N; j++) {
            A[i][j] = 0.0
        }
        A[i][i] = 1.0
    }

    A = makePositiveSemiDefinitive(A)

    return [A, b, x, y]
}

function makePositiveSemiDefinitive(array: Array<Array<number>>): Array<Array<number>> {

    const n = array.length
    let b = new Array<Array<number>>(n)
    for (let i = 0; i<n; i++) {
        b[i] = new Array<number>(n)
        for (let j = 0; j < n; j++) {
            b[i][j] = 0.0
        }
    }

    for (let t = 0; t < n; t++) {
        for (let r = 0; r < n; r++) {
            for (let s = 0; s < n; s++) {
                b[r][s] += array[r][t] * array[s][t]
            }
        }
    }
    for (let r = 0; r < n; r++) {
        for (let s = 0; s < n; s++) {
            array[r][s] = b[r][s]
        }
    }

    return array
}

function kernelLudcmp(
    N: number,
    A: Array<Array<number>>,
    b: Array<number>,
    x: Array<number>,
    y: Array<number>
): [A: Array<Array<number>>, x: Array<number>, y: Array<number>] {

    let w = 0.0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < i; j++) {
            w = A[i][j]
            for (let k = 0; k < j; k++) {
                w -= A[i][k] * A[k][j]
            }
            A[i][j] = w / A[j][j]
        }
        for (let j = 0; j < N; j++) {
            w = A[i][j]
            for (let k = 0; k < i; k++) {
                w -= A[i][k] * A[k][j]
            }
            A[i][j] = w
        }
    }

    for (let i = 0; i < N; i++) {
        w = b[i]
        for (let j = 0; j < i; j++) {
            w -= A[i][j] * y[j]
        }
        y[i] = w
    }

    for (let i = N-1; i >= 0; --i) {
        w = y[i]
        for (let j = i+1; j < N; j++) {
            w -= A[i][j] * x[j]
        }
        x[i] = w / A[i][i]
    }

    return [A, x, y]
}

function bench(
    N: number
): [number, number] {
    const [A, b, x, y] = initArray(N)
    const memTime = measureTimeAndMemory(() => {
        const [Aa, xxy, yy] = kernelLudcmp(N, A, b, x, y)
    })
    return memTime
}

export function benchLudCmp(): [number, number] {
    return bench(500)
}
