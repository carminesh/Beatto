class DrumKit {

    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.muteBtn = document.querySelectorAll('.mute');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.selects = document.querySelectorAll('select');
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.tempoIndicator = document.querySelector('.tempo-nr');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }

    //Apply the active effect on click
    activePad() {
        this.classList.toggle('active');
    }
    
    //Loop over all the pads
    repeat() {
        let step = this.index % 8;
        const activePad = document.querySelectorAll(`.b${step}`);
        activePad.forEach(pad => {
            pad.style.animation = 'playTrack 0.3s alternate ease-in-out 2';

            //Check if the pad is active
            if(pad.classList.contains('active')){

                //Check the sound type
                if(pad.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(pad.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(pad.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }   

        })
        this.index++;
    }

    start() {
        const interval = (60/this.bpm) * 1000;

        if(!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    //Update play button
    updateBtn() {   
        if(!this.isPlaying) {
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            this.playBtn.innerHTML = '<i class="fas fa-stop"></i>';
        }
    }

    //Change the sound
    changeSound(e) {
        const selectType = e.target.name;
        const soundValue = e.target.value;
        console.log(selectType, soundValue);
        
        switch(selectType) {
            case 'kick-select':
                this.kickAudio.src = soundValue;
                break;
            case 'snare-select':
                this.snareAudio.src = soundValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = soundValue;
                break;
            default:
                alert("Error");
                break;
        }
        

    }

    //Mute sound function
    muteSound(e) {
        const btnIndex = e.target.getAttribute('data-track');   
        e.target.classList.toggle('active');   

        if(e.target.classList.contains('active')) {
            switch(btnIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.valomue = 0;
                    break;
                case '3':
                    this.hihatAudio.volume = 0;
                    break;
                default:
                    break;
            }
        } else {
            switch(btnIndex) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.valomue = 1;
                    break;
                case '3':
                    this.hihatAudio.volume = 1;
                    break;
                default:
                    break;
            }
        }

    }   

    //Change the tempo of the track
    changeTempo(e) {
        const tempoIndicator = document.querySelector('.tempo-nr')
        this.bpm = e.target.value;
        this.tempoIndicator.innerHTML = e.target.value;  
    }

    //Update the tempo when the track is playing
    updateTempo() {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if(!this.playBtn.classList.contains('active')) {
            this.start();   
        }
    }
}


//Create the DrumKit object
const drumKit = new DrumKit();

//Start the music
drumKit.playBtn.addEventListener('click', () => {
    drumKit.start();
    drumKit.updateBtn();
});

//Active pad effect
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = "";
    });
});

//Change the music with the selectors
drumKit.selects.forEach(selector => {
    selector.addEventListener('change', function(e) {
        drumKit.changeSound(e);
    });
})

//Mute the music
drumKit.muteBtn.forEach(btn => {
    btn.addEventListener('click', function(e) {
        drumKit.muteSound(e);
    })
})

//Update and changing the tempo
drumKit.tempoSlider.addEventListener('input', function(e) {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function() {
    drumKit.updateTempo();
});
