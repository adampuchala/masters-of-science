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
    let result = polybench_rs::launch_3mm_polybench_benchmark();
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_covariance_polybench_benchmark() -> Array {
    let result = polybench_rs::launch_covariance_polybench_benchmark();
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_syr2k_polybench_benchmark() -> Array {
    let result = polybench_rs::launch_syr2k_polybench_benchmark();
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_ludcmp_polybench_benchmark() -> Array {
    let result = polybench_rs::launch_ludcmp_polybench_benchmark();
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_floyd_warshall_polybench_benchmark() -> Array {
    let result = polybench_rs::launch_floyd_warshall_polybench_benchmark();
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}

#[wasm_bindgen]
pub fn launch_heat_3d_polybench_benchmark() -> Array {
    let result = polybench_rs::launch_heat_3d_polybench_benchmark();
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}
