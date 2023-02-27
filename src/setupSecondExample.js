import { filteredAudio } from "./filteredAudio.js"

export function setupSecondExample() {
    const controls1 = document.getElementById("controls1")
    const audio1 = document.getElementById("exampleAudio1")
    
    const controls2 = document.getElementById("controls2")
    const audio2 = document.getElementById("exampleAudio2")
    

    controls1.addEventListener("click", () => {
        playerHelper(audio1, controls1)
       
        if (!audio2.paused) playerHelper(audio2, controls2)
    })

    controls2.addEventListener("click", () => {
        playerHelper(audio2, controls2, true)

        if (!audio1.paused) playerHelper(audio1, controls1)
    })

    audio1.addEventListener("ended", () => playerHelper(audio1, controls1))
    audio2.addEventListener("ended", () => playerHelper(audio2, controls2))
}

function playerHelper(audio, controls, filtered) {
    if (audio.paused) {
        audio.play()
        controls.src = "/svg/pause.svg"
        
        if (filtered) filteredAudio(audio)
        
        return 
    }

    audio.pause()
    controls.src = "/svg/play.svg"
}