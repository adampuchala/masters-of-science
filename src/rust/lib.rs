use js_sys::Array;
use wasm_bindgen::{prelude::*};
mod collection_copy;
pub mod matrix_multiplication;
pub mod benchmark;
pub mod log;

#[derive(serde::Serialize, serde::Deserialize)]
struct MemoryInfo {

}

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
