use wasm_bindgen::{JsValue};
use web_sys::Performance;


fn get_used_memory(performance: &Performance) -> Option<f64> {
    js_sys::Reflect::get(&performance, &JsValue::from_str("memory"))
    .and_then(|memory_info| js_sys::Reflect::get(&memory_info, &JsValue::from_str("usedJSHeapSize")))
    .and_then(|x| x.as_f64().ok_or_else(|| JsValue::from_str("undefined")))
    .ok()
}

pub fn measure_time_and_memory<F>(function: F) -> (f64, f64)
    where F: FnOnce() -> () {
        let performance = 
            web_sys::window()
            .and_then(|wnd| wnd.performance())
            .expect("performance should be available");
        let start_time = performance.now();
        let memory_before = get_used_memory(&performance);
        function();
        let memory_after = get_used_memory(&performance);
        let end_time = performance.now();

        let memory_consumption = if let Some(bef) = memory_before {
            memory_after.unwrap() - bef
        } else {
            -1.0
        };

        return (end_time - start_time, memory_consumption);
}
