import { benchFloydWarshall } from './polybench/config/medley/floyd-warshall'
import { bench_covariance } from './polybench/datamining/covariance'
import { benchSyr2k } from './polybench/linear_algebra/blas/syr2k'
import { bench_3mm } from './polybench/linear_algebra/kernels/_3mm'
import { benchLudCmp } from './polybench/linear_algebra/solvers/ludcmp'
import { benchHeat3D } from './polybench/stencils/heat-3d'


// @ts-ignore
import('./../../pkg').then((module)=> {
    console.log(`webassembly polybench 3mm ${module.launch_3mm_polybench_benchmark()}`)
    console.log(`webassembly polybench covariance ${module.launch_covariance_polybench_benchmark()}`)
    console.log(`webassembly polybench syr2k ${module.launch_syr2k_polybench_benchmark()}`)
    console.log(`webassembly polybench ludcmp ${module.launch_ludcmp_polybench_benchmark()}`)
    console.log(`webassembly polybench floyd warshall ${module.launch_floyd_warshall_polybench_benchmark()}`)
    console.log(`webassembly polybench heat 3d ${module.launch_heat_3d_polybench_benchmark()}`)

    console.log(`javascript polybench 3mm ${bench_3mm()}`)
    console.log(`javascript polybench covariance ${bench_covariance()}`)
    console.log(`javascript polybench syr2k ${benchSyr2k()}`)
    console.log(`javascript polybench ludcmp ${benchLudCmp()}`)
    console.log(`javascript polybench floydWarshall ${benchFloydWarshall()}`)
    console.log(`javascript polybench heat3D ${benchHeat3D()}`)
})
