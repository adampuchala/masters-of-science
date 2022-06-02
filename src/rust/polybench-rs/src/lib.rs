

pub mod datamining;
pub mod linear_algebra;
pub mod medley;
pub mod stencils;

pub mod config;
pub mod ndarray;
pub mod util;

pub fn launch_3mm_polybench_benchmark() -> (f64, f64) {
    use linear_algebra::kernels::_3mm;
    _3mm::bench::<80, 90, 100, 110, 120>()
}

pub fn launch_covariance_polybench_benchmark() -> (f64, f64) {
    use datamining::covariance;
    covariance::bench::<1200, 1400>()
}

pub fn launch_syr2k_polybench_benchmark() -> (f64, f64) {
    use linear_algebra::blas::syr2k;
    syr2k::bench::<1000,1200>()
}

pub fn launch_ludcmp_polybench_benchmark() -> (f64, f64) {
    use linear_algebra::solvers::ludcmp;
    ludcmp::bench::<200>()
}

pub fn launch_floyd_warshall_polybench_benchmark() -> (f64, f64) {
    use medley::floyd_warshall;
    floyd_warshall::bench::<280>()
}

pub fn launch_heat_3d_polybench_benchmark() -> (f64, f64) {
    use stencils::heat_3d;
    heat_3d::bench::<120, 50>()
}
