import { Matrix } from "./../matrix-multiplication"

test('should multiply 3 by 3 matrixes', () => {
    expect(()=>{
        let matrix1 = new Matrix(3, 3, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0])
        let matrix2 = new Matrix(3, 3, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0])
        matrix1.mutiply(matrix2)
    }).not.toThrow()
})

test('should multiply different sizes', () => {
    expect(()=>{
        let matrix1 = new Matrix(1, 3, [1.0, 2.0, 3.0])
        let matrix2 = new Matrix(3, 1, [1.0, 2.0, 3.0])
        matrix1.mutiply(matrix2)
    }).not.toThrow()
})

test('should multiply different sizes first thicker', () => {
    expect(()=>{
        let matrix1 = new Matrix(1, 3, [1.0, 2.0, 3.0])
        let matrix2 = new Matrix(3, 1, [1.0, 2.0, 3.0])
        matrix1.mutiply(matrix2)
    }).not.toThrow()
})

test('should return correct values in output matrix 1', () => {
    expect(()=>{
        let matrix1 = new Matrix(5, 2, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0])
        let matrix2 = new Matrix(1, 5, [1.0, 2.0, 3.0, 4.0, 5.0])
        let res = matrix1.mutiply(matrix2)

        expect(res).toEqual(new Matrix(1, 2, [55.0, 130.0]))
    }).not.toThrow()
})

test('should return correct values in output matrix 2', () => {
    expect(()=>{
        let matrix1 = new Matrix(3, 1, [1.0, 2.0, 3.0])
        let matrix2 = new Matrix(1, 3, [1.0, 2.0, 3.0])
        let res = matrix1.mutiply(matrix2)

        expect(res).toEqual(new Matrix(1, 1, [14.0]))
    }).not.toThrow()
})

test('should return correct values in output matrix 3', () => {
    expect(()=>{
        let matrix1 = new Matrix(8, 4, generateArrayOfRange(1, 8*4))
        let matrix2 = new Matrix(3, 8, generateArrayOfRange(1, 8*3))
        let res = matrix1.mutiply(matrix2)
        
        expect(res).toEqual(new Matrix(3, 4, [540.0, 576.0, 612.0, 1276.0, 1376.0, 1476.0, 2012.0, 2176.0, 2340.0, 2748.0, 2976.0, 3204.0]))
    }).not.toThrow()
})

test('should return invalid input error when matrix bounds not satisfied for multiplication', () => {
    expect(()=>{
        let matrix1 = new Matrix(1, 2, [1.0, 2.0])
        let matrix2 = new Matrix(3, 2, [1.0, 2.0, 3.0, 4.0, 1.0, 2.0, 3.0, 4.0])
        matrix1.mutiply(matrix2)
    }).toThrow()
})

function generateArrayOfRange(start: number, end: number): Array<number> {
    return [...Array(end - start).keys()].map((x) => x+start)
}
