use std::{fmt::{Display, Formatter}, cmp::min};

#[derive(Debug)]
struct Matrix {
    width: usize,
    height: usize,
    data: Vec<i32>
}

#[derive(Debug)]
enum MatrixError {
    InvalidInput
}

impl Matrix {
    pub fn new(width: usize, height: usize, data: Vec<i32>) -> Self {
        Self {
            width,
            height,
            data
        }
    }

    pub fn multiply(&self, other: &Matrix) -> Result<Matrix, MatrixError> {
        if self.width != other.height {
            return Err(MatrixError::InvalidInput)
        }
        let (new_w, new_h) = (min(self.width, other.width), self.height);

        let mut new_data = Vec::<i32>::new();
        let rows: Vec<&[i32]> = self.data.chunks(self.width).collect();
        for i in 0..new_h {
            for j in 0..new_w {
                let row_iter = rows[i].iter();
                let columns = other.data.iter().skip(j).step_by(other.width);
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
}

impl PartialEq for Matrix {
    fn eq(&self, other: &Self) -> bool {
        self.width == other.width && self.height == other.height && self.data == other.data
    }
}

impl Display for Matrix {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let mut matrix_data_iter = self.data.iter();
        for _ in 0..self.height {
            for _ in 0..self.width {
                f.write_fmt(format_args!("{} ", matrix_data_iter.next().unwrap()))?;
            }
            f.write_str("\n")?
        }
        return Ok(());
    }
}


pub fn benchmark_matrix_multiplication() {
        let m1 = Matrix::new(3, 3, vec![1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let m2 = Matrix::new(3, 3, vec![1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
        let m3 = Matrix::new(5, 2, vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        let m4 = Matrix::new(1, 5, vec![1, 2, 3, 4, 5]);
    
        for _ in 0..10 {
            m1.multiply(&m2).unwrap();
            m3.multiply(&m4).unwrap();
        }
}

// #[cfg(test)]
// mod tests {
//     use crate::Matrix;

//     #[test]
//     fn should_multiply_3_by_3_matrixes() {
//         let m1 = Matrix::new(3, 3, vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]);
//         let m2 = Matrix::new(3, 3, vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]);
//         let res_m = m1.multiply(&m2);

//         assert!(res_m.is_ok());
//     }

//     #[test]
//     fn should_multiply_different_sizes() {
//         let m1 = Matrix::new(1, 3, vec![1.0, 2.0, 3.0]);
//         let m2 = Matrix::new(3, 1, vec![1.0, 2.0, 3.0]);
//         let res_m = m1.multiply(&m2);

//         assert!(res_m.is_ok());
//     }

//     #[test]
//     fn should_multiply_different_sizes_first_thicker() {
//         let m1 = Matrix::new(3, 1, vec![1.0, 2.0, 3.0]);
//         let m2 = Matrix::new(1, 3, vec![1.0, 2.0, 3.0]);
//         let res_m = m1.multiply(&m2);

//         assert!(res_m.is_ok());
//     }

//     #[test]
//     fn should_return_correct_values_in_output_matrix_1() {
//         let m3 = Matrix::new(5, 2, vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]);
//         let m4 = Matrix::new(1, 5, vec![1.0, 2.0, 3.0, 4.0, 5.0]);
//         let res_m = m3.multiply(&m4);

//         assert!(res_m.is_ok());
//         assert_eq!(res_m.unwrap(), Matrix::new(1, 2, vec![55.0, 130.0]));
//     }

//     #[test]
//     fn should_return_correct_values_in_output_matrix_2() {
//         let m1 = Matrix::new(3, 1, vec![1.0, 2.0, 3.0]);
//         let m2 = Matrix::new(1, 3, vec![1.0, 2.0, 3.0]);
//         let res_m = m1.multiply(&m2);

//         assert!(res_m.is_ok());
//         assert_eq!(res_m.unwrap(), Matrix::new(1, 1, vec![14.0]));
//     }

//     #[test]
//     fn should_return_correct_values_in_output_matrix_3() {
//         let m1 = Matrix::new(8, 4, (1..8*4+1).map(i32::from).collect());
//         let m2 = Matrix::new(3, 8, (1..3*8+1).map(i32::from).collect());
//         let res_m = m1.multiply(&m2);
//         let correct_res = Matrix::new(3, 4, vec![540.0, 576.0, 612.0, 1276.0, 1376.0, 1476.0, 2012.0, 2176.0, 2340.0, 2748.0, 2976.0, 3204.0]);
//         assert!(res_m.is_ok());
//         assert_eq!(res_m.unwrap(), correct_res);
//     }

//     #[test]
//     fn should_return_invalid_input_error_when_matrix_bounds_not_satisfied_for_multiplication() {
//         let m1 = Matrix::new(1, 2, vec![1.0, 2.0]);
//         let m2 = Matrix::new(3, 2, vec![1.0, 2.0, 3.0, 4.0, 1.0, 2.0, 3.0, 4.0]);
//         let res_m = m1.multiply(&m2);

//         assert!(res_m.is_err());
//     }
// }
