use wasm_bindgen::prelude::*;
use std::{fmt::{Display, Formatter}};

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[allow(unsafe_code)]
fn console_log(s: &str) {
    log(s);
    
}

struct Matrix {
    width: usize,
    height: usize,
    data: Vec<f64>
}

#[derive(Debug)]
enum MatrixError {
    InvalidInput
}

impl Matrix {
    pub fn new(width: usize, height: usize, data: Vec<f64>) -> Self {
        Self {
            width,
            height,
            data
        }
    }

    pub fn multiply(&self, other: &Self) -> Result<Self, MatrixError> {
        if self.width != other.height {
            return Err(MatrixError::InvalidInput)
        }
        let (new_w, new_h) = (self.width, self.height);

        let mut new_data = Vec::<f64>::new();
        let rows = self.data.chunks(self.width);
        for row in rows {
            for i in 0..self.width {
                let row_iter = row.iter();
                let columns = other.data.iter().skip(i).step_by(other.width);
                let sum = row_iter.zip(columns)
                    .map(|(x, y)| x * y)
                    .sum();
                new_data.push(sum);
            }
        }
       

        return Ok(Self {
            width: new_w,
            height: new_h,
            data: new_data
        });
    }

    fn get_value_at_xy(&self, x: usize, y: usize) -> f64 {
        let idx = (self.width * y) + x;
        return self.data[idx];
    }

}

impl Display for Matrix {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        for i in 0..self.width {
            for j in 0..self.height {
                f.write_fmt(format_args!("{} ", self.get_value_at_xy(i, j)))?;
            }
            println!()
        }
        return Ok(());
    }
}

#[wasm_bindgen]
pub fn matrix_multiplication() {
    let m1 = Matrix::new(3, 3, vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]);
        let m2 = Matrix::new(3, 3, vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]);
    
        let res_m = m1.multiply(&m2).unwrap();
    // println!("{}", res_m);
    console_log(format!("{}", res_m).as_str());
}

#[wasm_bindgen]
pub fn test_m() {
    console_log("Module successfully loaded Performing tests...");
}

#[cfg(test)]
mod tests {
    use crate::Matrix;

    #[test]
    fn should_multiply_3_by_3_matrixes() {
        let m1 = Matrix::new(3, 3, vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]);
        let m2 = Matrix::new(3, 3, vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]);
        let res_m = m1.multiply(&m2);

        assert!(res_m.is_ok());
    }

    #[test]
    fn should_multiply_different_sizes() {
        let m1 = Matrix::new(1, 3, vec![1.0, 2.0, 3.0, 4.0]);
        let m2 = Matrix::new(3, 1, vec![1.0, 2.0, 3.0, 4.0]);
        let res_m = m1.multiply(&m2);

        assert!(res_m.is_ok());
    }

    #[test]
    fn should_return_invalid_input_error_when_matrix_bounds_not_satisfied_for_multiplication() {
        let m1 = Matrix::new(1, 2, vec![1.0, 2.0]);
        let m2 = Matrix::new(3, 2, vec![1.0, 2.0, 3.0, 4.0, 1.0, 2.0, 3.0, 4.0]);
        let res_m = m1.multiply(&m2);

        assert!(res_m.is_err());
    }
}
