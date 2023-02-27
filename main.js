import { ConvertTo8Bit } from "./src/ConvertImageTo8Bit.js";
import { filteredAudio } from "./src/filteredAudio.js";
import { InitMedia } from "./src/InitMedia.js";
import { setupFirstExample } from "./src/setupFirstExample.js";
import { setupSecondExample } from "./src/setupSecondExample.js";

setupFirstExample()
setupSecondExample()

const background = document.getElementById("img")
const audio = document.getElementById("audio")
const control = document.getElementById("controls")
const ratioInput = document.getElementById("ratio")
const Media = new InitMedia(control)

const cvs = document.getElementById("cvs")
const ctx = cvs.getContext('2d')

cvs.width = 250

let ratio = 1

const allowedFiles = {
    video: ["mp4"],
    image: ["svg", "jpg", "jpeg", "png"],
    audio: ["mp3", "wav"]
}

const changeHandler = ev => {
    const reader = new FileReader()
    const filePath = ev.target.value
    const fileTypeStart = filePath.match(/\./).index
    const fileType = filePath.split("").reduce((acc, cur, i) => 
        i <= fileTypeStart 
            ? ""
            : acc + cur
    )

    reader.readAsDataURL(ev.target.files[0])

    reader.onload = () => {
        const isVideo = allowedFiles.video.includes(fileType)
        const isAudio = allowedFiles.audio.includes(fileType)

        if (isVideo || isAudio) {
            let element
            const type = isVideo ? "video" : "audio"
            
            if (isVideo) {
                element = document.createElement('video')
                element.muted = true
            }
            if (isAudio) element = document.createElement('audio')
            element.src = reader.result
            element.addEventListener("ended", () => {
                Media.pause()
                Media.resetAllCurrentTime()
            }, { once: true })

            Media.init({type, element}, isAudio && filteredAudio)

            return
        }
        const element = new Image()
        element.src = reader.result
        const type = "image"

        Media.init({type, element})
    }
}

const clickHandler = () => {
    const status = Media.getStatus()

    if (status === "paused") {
        Media.play()

        loop()

        return 
    }

    Media.pause()
}

const ratioHandler = ev => {
    const value = ev.target.value
    
    if (Number(value) || Number(value) === 0) ratio = Number(value)
}

function loop() {
    const status = Media.getStatus()
    const loadedBackground = Media.getBackground()
    
    const size = [cvs.width, cvs.height]
    const position = [0, 0]

    ctx.drawImage(loadedBackground, ...position, ...size)
    const frame = ctx.getImageData(...position, ...size)
   
    const converter = new ConvertTo8Bit(frame, size, ratio)

    ctx.putImageData(converter.convert(), ...position)

    status === "played" && requestAnimationFrame(loop)
}

background.addEventListener("change", changeHandler)
audio.addEventListener("change", changeHandler)
ratioInput.addEventListener("change", ratioHandler)
control.addEventListener("click", clickHandler)