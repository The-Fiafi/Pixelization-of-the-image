export class ConvertTo8Bit {
    constructor(frame, size, ratio) {
        this.frame = frame
        this.size = size
        this.ratio = ratio
    }
    
    convert() {
        const [width] = this.size.map(el => el * 4)

        const horizontalPixelSkip = 4 * this.ratio * 2
        const verticalPixelSkip = this.ratio * (width + 4)

        for (let i = verticalPixelSkip; i < this.frame.data.length; i += 4 + horizontalPixelSkip) {
            for (let x = 1; x < this.ratio + 1; x++) {
                this._drawPixel(width, i, x)
            }

            if (i + horizontalPixelSkip >= Math.ceil(i / width) * width) i += width * this.ratio * 2
        }

        return this.frame
    }

    _drawPixel(width, i, x) {
        const leftPixel = i - 4 * x
        const rightPixel = i + 4 * x

        const pixelTop = i - width * x
        const pixelBottom = i + width * x

        const pixelsArray = [
            leftPixel, rightPixel,
            pixelTop, pixelBottom,
        ]

        const fillPixels = pixelArr => {
            pixelArr.forEach(pixel => {
                this.frame.data[pixel] = this.frame.data[i]
                this.frame.data[pixel + 1] = this.frame.data[i + 1]
                this.frame.data[pixel + 2] = this.frame.data[i + 2]
                this.frame.data[pixel + 3] = this.frame.data[i + 3]
            })
        }

        fillPixels(pixelsArray)

        for (let j = -x; j < x + 1; j++) {
        
            const leftTringle = leftPixel - width * j
            const topTringle = pixelTop - 4 * j       
            const tightTringle = rightPixel - width * j
            const bottomTringle = pixelBottom - 4 * j      

        
            fillPixels([
                leftTringle, 
                topTringle,
                tightTringle,
                bottomTringle
            ])
        }

        return this.frame
    }
}