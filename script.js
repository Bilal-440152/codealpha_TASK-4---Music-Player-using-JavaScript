const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar");
const volumeLabel = document.getElementById("volumeLabel");

let isPlaying = false;

function formatTime(seconds) {
  if (!isFinite(seconds)) {
    return "0:00";
  }
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
}

function setDuration() {
  progressBar.max = audio.duration;
  durationEl.textContent = formatTime(audio.duration);
}

audio.addEventListener("loadedmetadata", function () {
  if (audio.duration === Infinity || isNaN(audio.duration)) {
    audio.currentTime = 1e101;
    audio.addEventListener("timeupdate", function fixDuration() {
      audio.currentTime = 0;
      audio.removeEventListener("timeupdate", fixDuration);
      setDuration();
    });
  } else {
    setDuration();
  }
});

playBtn.addEventListener("click", function () {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

prevBtn.addEventListener("click", function () {
  audio.currentTime = 0;
});

nextBtn.addEventListener("click", function () {
  audio.currentTime = audio.duration;
});

audio.addEventListener("timeupdate", function () {
  progressBar.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", function () {
  audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", function () {
  audio.volume = Number(volumeBar.value) / 100;
  volumeLabel.textContent = volumeBar.value;
});

audio.addEventListener("ended", function () {
  isPlaying = false;
  playBtn.textContent = "▶";
});

audio.volume = 0.7;