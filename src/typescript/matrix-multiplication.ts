
export class MatrixError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, MatrixError.prototype)
    }
}

export class Matrix {
    width: number
    height: number

    data: Array<number>

    constructor(
        width: number,
        height: number,
        data: Array<number>
    ) {
        this.width = width
        this.height = height
        this.data = data
    }

    public mutiply(other: Matrix): Matrix {
        if (this.width != other.height) {
            throw new MatrixError("Invalid input")
        }

        const newMatrixData = Array<number>();
        let newWidth = 0;
        if(this.width < other.width) {
            newWidth = this.width;
        } else {
            newWidth = other.width;
        }
        const newHeight = this.height
        for(let i=0; i<newHeight; i++) {
            for(let j=0; j<newWidth; j++) {
                let sum = 0;
                for(let k=0; k<this.width; k++) {
                    let mul = this.data[k + (i*this.width )] * other.data[j+ (k*other.width)]
                    sum += mul;
                }
                newMatrixData.push(sum)
            }
        }
        return new Matrix(newWidth, newHeight, newMatrixData)
    }

    private getValueAtXY(x: number, y: number): number {
        let idx = (this.width * y) + x
        return this.data[idx]
    }

    public toString(): string {
        let outputStr = Array<string>()

        for(let j = 0; j<this.height; j++) {
            for(let i = 0; i< this.width; i++) {
                outputStr.push(`${this.getValueAtXY(i, j)} `)
            }
            outputStr.push("\n")
        }

        return outputStr.join("")
    }

    public equals(other: Matrix): boolean {
        return this.width === other.width && this.height === other.height && this.data === other.data
    }
}

function matrix_multiplication_ts() {
    let matrix1 = new Matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    let matrix2 = new Matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9])

    let m3 = new Matrix(5, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let m4 = new Matrix(1, 5, [1, 2, 3, 4, 5]);

    for(let i=0; i<10; i++) {
        matrix1.mutiply(matrix2)
        m3.mutiply(m4)
    }
}
