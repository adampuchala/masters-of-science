
pub fn benchmark_strings_collection_copy(power: u32) {

    let pow = 10_i32.pow(power);
    let mut collection_to_copy: Vec<String> = vec!["aabc".into()];
    for idx in 0..pow {
        collection_to_copy.push(format!("aabcc{}", idx));
    }

    let result_collection = collection_to_copy.clone();
}
