class Sound {
    constructor(idMusic, volume = 0.95) {
        this.idMusic = idMusic;
        this.music = document.getElementById(idMusic);
        this.volume = volume;
        this.isPlaying = false;
    }

    play() {
        if( this.music ){
            this.music.volume = this.volume;
            this.music.play();
            this.isPlaying = true;
        }
    }

    pause() {
        if( this.music ){
            this.music.pause();
            this.isPlaying = false;
        }
    }

    stop() {
        if( this.music ){
            this.music.pause();
            this.music.currentTime = 0;
            this.isPlaying = false;
        }
    }
}

export default Sound;