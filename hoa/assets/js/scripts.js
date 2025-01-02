window.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('backgroundAudio');

    // Attempt to play the audio immediately
    setTimeout(function() {
        audio.play().catch(function(error) {
            console.log("Autoplay blocked:", error);
        });
    }, 100); 
});

// Prevent right-click and redirect to Google search
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    window.location.href = 'https://www.google.com/search?q=How+to+stop+skidding';
});