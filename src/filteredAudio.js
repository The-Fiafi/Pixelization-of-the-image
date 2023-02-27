export function filteredAudio(audio) {
    const ctx = new AudioContext()
    const audioSource = ctx.createMediaElementSource(audio)
    const analyzer = ctx.createAnalyser()
    const filter = ctx.createWaveShaper()

    filter.curve = curve()
    audioSource.connect(analyzer)
        .connect(filter)
        .connect(ctx.destination)  
}

function curve() {
    const nSamples = 100
    const curve = new Float32Array(nSamples)
    
    for (let i = 0; i < curve.length; i++) {
        const x = 2 * i / nSamples - 1
        if (Math.abs(x) > 0.5) {
            curve[i] = 0.5 * Math.sign(x)

            continue
        }
        curve[i] = x > 0 ? -x : x
    }
    return curve
}