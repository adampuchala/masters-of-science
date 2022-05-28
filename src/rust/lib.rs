use collection_copy::benchmark_strings_collection_copy;
use wasm_bindgen::prelude::*;
mod collection_copy;
pub mod matrix_multiplication;

#[wasm_bindgen]
pub fn run_wasm_benchmarks() {
    let collection_copy_time = benchmark_strings_collection_copy(3);
}
