use js_sys::Array;
use wasm_bindgen::{prelude::*};
use wasm_bench_tool::benchmark;
mod collection_copy;
pub mod matrix_multiplication;
pub mod log;

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = performance, js_name = memory)]
    pub fn memory() -> JsValue;
}

#[wasm_bindgen]
pub fn run_wasm_benchmarks() -> Array  {
    let result = benchmark::measure_time_and_memory(||{
        collection_copy::strings_collection_copy(5);
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_3mm_polybench_benchmark() -> Array {
    use polybench_rs::linear_algebra::kernels::_3mm;
    let result = benchmark::measure_time_and_memory(||{
        _3mm::bench::<80, 90, 100, 110, 120>();
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_covariance_polybench_benchmark() -> Array {
    use polybench_rs::datamining::covariance;
    let result = benchmark::measure_time_and_memory(||{
        covariance::bench::<1200, 1400>();
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_syr2k_polybench_benchmark() -> Array {
    use polybench_rs::linear_algebra::blas::syr2k;
    let result = benchmark::measure_time_and_memory(||{
        syr2k::bench::<1000,1200>();
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_ludcmp_polybench_benchmark() -> Array {
    use polybench_rs::linear_algebra::solvers::ludcmp;
    let result = benchmark::measure_time_and_memory(||{
        ludcmp::bench::<200>();
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_floyd_warshall_polybench_benchmark() -> Array {
    use polybench_rs::medley::floyd_warshall;
    let result = benchmark::measure_time_and_memory(||{
        floyd_warshall::bench::<280>();
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_heat_3d_polybench_benchmark() -> Array {
    use polybench_rs::stencils::heat_3d;
    let result = benchmark::measure_time_and_memory(||{
        heat_3d::bench::<120, 50>();
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}
