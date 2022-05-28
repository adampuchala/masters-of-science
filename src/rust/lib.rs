use js_sys::Array;
use wasm_bindgen::{prelude::*};
mod collection_copy;
pub mod matrix_multiplication;
pub mod benchmark;
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
pub fn launch_poly_benchmark() -> Array {
    use polybench_rs::stencils::jacobi_2d;

    let result = benchmark::measure_time_and_memory(||{
        jacobi_2d::bench::<1000, 5>();
    });
    Array::of2(&JsValue::from_f64(result.0), &JsValue::from_f64(result.1))
}
