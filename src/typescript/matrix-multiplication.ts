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

    mutiply(other: Matrix): Matrix {
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

    toString(): string {
        let outputStr = Array<string>()

        for(let j = 0; j<this.height; j++) {
            for(let i = 0; i< this.width; i++) {
                outputStr.push(`${this.getValueAtXY(i, j)} `)
            }
            outputStr.push("\n")
        }

        return outputStr.join("")
    }
}
