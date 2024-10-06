document.addEventListener("DOMContentLoaded", function() {
    const sentences = [
        "Larper Gang!",
        "The more you know, the less you understand.",
        "Corny Com kids",
        "#GetRanOutOfCom"
    ];

    const typingText = document.getElementById("typing-text");
    const cursor = document.createElement("span");
    cursor.className = "cursor"; // Add the blinking cursor
    typingText.appendChild(cursor); // Append cursor to the typing text
    let sentenceIndex = 0;
    let charIndex = 0;
    let typingSpeed = 100; // Typing speed in ms
    let deletingSpeed = 50; // Deleting speed in ms
    let typingTimeout;

    function type() {
        if (charIndex < sentences[sentenceIndex].length) {
            typingText.textContent += sentences[sentenceIndex].charAt(charIndex);
            charIndex++;
            typingTimeout = setTimeout(type, typingSpeed);
        } else {
            // When the sentence is fully typed, start deleting
            setTimeout(deleteText, 1000); // Wait before starting to delete
        }
    }

    function deleteText() {
        if (charIndex > 0) {
            typingText.textContent = sentences[sentenceIndex].substring(0, charIndex - 1);
            charIndex--;
            typingTimeout = setTimeout(deleteText, deletingSpeed);
        } else {
            // Move to the next sentence
            sentenceIndex = (sentenceIndex + 1) % sentences.length; // Loop through sentences
            setTimeout(type, 500); // Wait before typing the next sentence
        }
    }

    type(); // Start the typing effect
});
