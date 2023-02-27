import { ConvertTo8Bit } from "./ConvertImageTo8Bit.js"

export function setupFirstExample() {
    const img = document.getElementById("example1")
    const cvs = document.getElementById("exampleCvs1")
    const ctx = cvs.getContext("2d")

    cvs.width = window.innerWidth
    cvs.width = window.innerHeight

    const size = [cvs.width, cvs.height]
    const options = [0, 0, ...size]
    

    ctx.drawImage(img, ...options)
    const frame = ctx.getImageData(...options)

    const converter = new ConvertTo8Bit(frame, size, 2)

    ctx.putImageData(converter.convert(), 0, 0)
}