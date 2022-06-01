import { measureTimeAndMemory } from "../../../benchmark"

function initArray(
    NI: number,
    NJ: number,
    NK: number,
    NL: number,
    NM: number
    ) : [A: Array<Array<number>>,B: Array<Array<number>>,C: Array<Array<number>>,D: Array<Array<number>>] {
        const a = new Array<Array<number>>(NI)
        const b = new Array<Array<number>>(NK)
        const c = new Array<Array<number>>(NJ)
        const d = new Array<Array<number>>(NL)
        
        for (let i = 0; i < NI; i++) {
            a[i] = new Array<number>(NK)
            for (let j = 0; j < NK; j++) {
                a[i][j] = ((i * j + 1) %  NI ) / (5 * NI)
            }
        }

        for (let i = 0; i < NK; i++) {
            b[i] = new Array<number>(NJ)
            for (let j = 0; j < NJ; j++) {
                b[i][j] = ((i * (j + 1) + 2) % NJ ) / (5 * NJ)
            }
        }

        for (let i = 0; i < NJ; i++) {
            c[i] = new Array<number>(NM)
            for (let j = 0; j < NM; j++) {
                c[i][j] = (i * (j + 3) % NL) / (5 * NL)
            }
        }

        for (let i = 0; i < NM; i++) {
            d[i] = new Array<number>(NL)
            for (let j = 0; j < NL; j++) {
                d[i][j] = ((i * (j + 2) + 2 ) % NI) / (5 * NK)
            }
        }

        return [a,b,c,d]
    }

    function kernel3mm(
        NI: number,
        NJ: number,
        NK: number,
        NL: number,
        NM: number,
        A: Array<Array<number>>,
        B: Array<Array<number>>,
        C: Array<Array<number>>,
        D: Array<Array<number>>
    ) : [E: Array<Array<number>>, F: Array<Array<number>>, G: Array<Array<number>>] {

        const e = new Array<Array<number>>(NI)
        const f = new Array<Array<number>>(NJ)
        const g = new Array<Array<number>>(NI)

        for (let i = 0; i < NI; i++) {
            e[i] = new Array<number>(NJ)
            for (let j = 0; j < NJ; j++) {
                e[i][j] = 0.0
                for (let k = 0; k < NK; k++) {
                    e[i][j] += (A[i][k] * B[k][j])
                }
            }
        }

        for (let i = 0; i < NJ; i++) {
            f[i] = new Array<number>(NL)
            for (let j = 0; j < NL; j++) {
                f[i][j] = 0.0
                for (let k = 0; k < NM; k++) {
                    f[i][j] += (C[i][k] * D[k][j])
                }
            }
        }

        for (let i = 0; i < NI; i++) {
            g[i] = new Array<number>(NL)
            for (let j = 0; j < NL; j++) {
                g[i][j] = 0.0
                for (let k = 0; k < NJ; k++) {
                    g[i][j] += (e[i][k] * f[k][j])
                }
            }
        }

        return [e,f,g]
    }

    function bench(
        NI: number,
        NJ: number,
        NK: number,
        NL: number,
        NM: number
    ) : [number, number] {
        const [A, B, C, D] = initArray(NI, NJ, NK, NL, NM)
        const time_mem = measureTimeAndMemory(() => {
            const [kernel_e, kernel_f, kernel_g] = kernel3mm(NI, NJ, NK, NL, NM, A, B, C, D)
        })

        return time_mem
    }

    export function bench_3mm(): [number, number] {
        return bench(
            80, 90, 1100, 110, 120
        )
    }
    