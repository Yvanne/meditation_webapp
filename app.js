//function
const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".fa-play");
  const outline = document.querySelector(".moving-outline circle"); //only gets the circle inside the svg
  const video = document.querySelector(".vid-container video");

  //SOUNDS
  const sounds = document.querySelectorAll(".sound-picker button");
  //   TIME DISPLAY
  const timedisplay = document.querySelector(".time-display");
  //   TIME SELECTING
  const timeSelect = document.querySelectorAll(".time-select button");
  //   GETS LENGTH OF  CIRLE OUTLINE
  const outlineLength = outline.getTotalLength();
  //this return the length of outline
  console.log(outlineLength);

  //  DEFAULT TIME DURATION
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //   SELECTING WANTED SONG
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      isPlaying(song);
    });
  });

  //   PLAYS SOUND WHEN CLICKED
  play.addEventListener("click", () => {
    isPlaying(song);
  });

  //   SELECTING WANTED TIME
  timeSelect.forEach(Option => {
    Option.addEventListener("click", function() {
      //   updates default time duration based of time selected
      fakeDuration = this.getAttribute("data-time");
      timedisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //   function to play and stop playing sound
  const isPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.className = "fas fa-pause fa-4x";
    } else {
      song.pause();
      video.pause();
      play.className = "fas fa-play fa-4x";
    }
  };

  //   WE ANIMATE THE CIRCLE WHERE THE PLAY BUTTON IS. THIS IS HOW WE WILL GET THE EFFECT OF THE BLUE COLOR ON THE CIRCLE THAT SIGNIFIES THE AMOUNT OF TIME ELAPSING.
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let songDuration = fakeDuration - currentTime;
    // this jumps back to 0 once it gets to 60. we use math.floor to get an exact whole number
    let seconds = Math.floor(songDuration % 60);
    let minutes = Math.floor(songDuration / 60);

    // ANIMATING THE CIRCLE
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // ANIMATING THE TIME TEXT (0:00) THIS WILL COUNT DOWN DEPENDING ON THE AMOUNT OF TIME THE USER SELECTED.
    timedisplay.textContent = `${minutes}:${seconds}`;

    //WHEN THE TIME IS UP, PAUSE THE SONG AND VIDEO AND RESET THE CURRENT TIME
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.className = "fas fa-play fa-4x";
      video.pause();
    }
  };
};

app();
