document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audio"),
        video = document.getElementById("video"),
        musicSlider = document.querySelector(".music-slider"),
        sliderProgress = document.querySelector(".slider-progress"),
        pauseButton = document.querySelector(".pause-button img"),
        currentTimeDisplay = document.querySelector(".current-time"),
        totalDurationDisplay = document.querySelector(".total-duration"),
        songTitle = document.querySelector(".song-title"),
        forwardButton = document.querySelector(".forward-button img"),
        backwardButton = document.querySelector(".backward-button img"),
        enterButton = document.getElementById("enter"),
        playButton = document.querySelector(".pause-button img.play-icon"); // Reference to the play button

    var playlist = [
        {
            title: "41 - Or What",
            audioSrc: "assets/audio/orwhataudio.mp3",
            videoSrc: "assets/bg/orwhat.mp4",
            duration: 78
        },
        {
            title: "Yeat - Poppin",
            audioSrc: "assets/audio/PopAudio.mp3",
            videoSrc: "assets/bg/Yeatpoppin.mp4",
            duration: 225
        },
        {
            title: "LUCKI - New Drank",
            audioSrc: "assets/audio/LuckiNewDrank.mp3",
            videoSrc: "assets/bg/newdrank.mp4",
            duration: 225
        },
        {
            title: "Real Boston Richey - Help Me",
            audioSrc: "assets/audio/Helpme.mp3",
            videoSrc: "assets/bg/realboston.mp4",
            duration: 225
        },
        {
            title: "Playboi Carti - ALL RED",
            audioSrc: "assets/audio/Allred.mp3",
            videoSrc: "assets/bg/red.mp4",
            duration: 225
        },
        {
            title: "Memphis - 9MM",
            audioSrc: "assets/audio/Crashout.mp3",
            videoSrc: "assets/bg/Crashout.mp4",
            duration: 76
        }
    ];

    var currentIndex = 0;

    function loadSong(index) {
        var song = playlist[index];
        audio.src = song.audioSrc;
        video.src = song.videoSrc;
        songTitle.textContent = song.title;
        totalDurationDisplay.textContent = formatTime(song.duration);
        audio.currentTime = 0;
        updateProgressBar();
        updateTimes();
        audio.play();
        video.play();
        updatePlayPauseIcons();
    }

    function updateProgressBar() {
        let progress = (audio.currentTime / audio.duration) * 100;
        sliderProgress.style.width = `${progress}%`;
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            video.play().catch((error) => {
                console.error("Error playing video:", error);
            });
        } else {
            audio.pause();
            video.pause();
        }
        updatePlayPauseIcons();
    }

    function updateTimes() {
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        totalDurationDisplay.textContent = formatTime(audio.duration);
    }

    function formatTime(seconds) {
        return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
    }

    function updatePlayPauseIcons() {
        let pauseIcon = document.querySelector(".pause-icon"),
            playIcon = document.querySelector(".play-icon");
        pauseIcon.style.display = audio.paused ? "none" : "block";
        playIcon.style.display = audio.paused ? "block" : "none";
    }

    audio.addEventListener("loadedmetadata", function() {
        totalDurationDisplay.textContent = formatTime(audio.duration);
    });
    audio.addEventListener("timeupdate", function() {
        updateProgressBar();
        updateTimes();
    });

    playButton.addEventListener("click", function() {
        togglePlayPause();
    });

    pauseButton.addEventListener("click", togglePlayPause);

    musicSlider.addEventListener("click", function(e) {
        let rect = musicSlider.getBoundingClientRect(),
            clickPosition = e.clientX - rect.left,
            percentage = clickPosition / rect.width;
        audio.currentTime = percentage * audio.duration;
    });

    enterButton.addEventListener("click", function() {
        this.remove();
        loadSong(currentIndex);
    });

    audio.onended = function() {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadSong(currentIndex);
    };

    forwardButton.addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadSong(currentIndex);
    });

    backwardButton.addEventListener("click", function() {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentIndex);
    });
});
