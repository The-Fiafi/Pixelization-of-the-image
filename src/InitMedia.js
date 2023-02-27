export class InitMedia {
    constructor(controls) {
        this.media = {}
        this.status = "paused"
        this.controls = controls
    }

    init(el, callback) {
        this.pause()
        this.resetAllCurrentTime()
        
        const interchangeable = [
            "image",
            "video"
        ]

        if (interchangeable.includes(el.type)) {
            interchangeable.forEach(swap => swap !== el.type 
                ? delete this.media[swap] 
                : null    
            )
        }
        
        this.media[el.type] = el.element
        callback && callback(el.element)
    }

    play() {
        this.status = "played"
        this.controls.src = "/svg/pause.svg"

        if (!this._isExist()) return 

        for (let i of Object.keys(this.media)) {
            if (i === "image") continue
            const el = this.media[i]

            if (el.paused) {
                el.play()

                continue
            }

            el.pause()
            el.play()
        }
    }

    pause() {
        this.status = "paused"
        this.controls.src = "/svg/play.svg"
        console.log("pause", this.controls)
        if (!this._isExist()) return 

        for (let i of Object.keys(this.media)) {
            if (this.media[i].paused || i === "image") continue

            this.media[i].pause()            
        }
    }

    getStatus() {
        return this.status
    }

    getBackground() {
        if (this.media.video) return this.media.video
        if (this.media.image) return this.media.image

        const element = new Image()
        element.src = "/img/ChildrenOfTheCity.jpg"

        return element
    }
    
    resetAllCurrentTime() {
        if (!this._isExist()) return 

        for (let i of Object.keys(this.media)) {
            if (i === "image") continue

            this.media[i].currentTime = 0
        }
    }

    _isExist() {
        return !!Object.keys(this.media).length
    }
}