var firebaseConfig = {
    apiKey: "AIzaSyBM24-Yk7TP2wMCB0bFvZgzAE7R9LjOvFI",
    authDomain: "comkids-52fd8.firebaseapp.com",
    databaseURL: "https://comkids-52fd8-default-rtdb.firebaseio.com",
    projectId: "comkids-52fd8",
    storageBucket: "comkids-52fd8.firebasestorage.app",
    messagingSenderId: "1050486755449",
    appId: "1:1050486755449:web:7bd58ce6c055d4e9a544a8",
    measurementId: "G-8RGK911SLT"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var chatBox = document.getElementById('chatBox');
var messageInput = document.getElementById('messageInput');
var usernameModal = document.getElementById('usernameModal');
var usernameInput = document.getElementById('usernameInput');
var levelDisplay = document.getElementById('userLevel');
var usersDisplay = document.getElementById('usersDisplay');

var username = localStorage.getItem('username');
if (!username) {
    usernameModal.style.display = 'flex';
} else {
    document.querySelector('.input-box').style.display = 'flex';
}

const roles = {
    "Admin": "#FF0000",
    "Cat": "#FF69B4",
    "Cool": "#00FF00",
    "Hacker": "#0000FF"
};

var userMessagesCount = 0;
var userLevel = 0;

function checkUsernameExists(username, callback) {
    database.ref('users').orderByChild('username').equalTo(username).once('value', function(snapshot) {
        callback(snapshot.exists());
    });
}

window.setUsername = function () {
    var usernameInputValue = usernameInput.value.trim();

    if (usernameInputValue.toLowerCase() === 'crashout') {
        checkUsernameExists('crashout', function(exists) {
            if (exists) {
                alert('The username "Crashout" is already taken!');
            } else {
                localStorage.setItem('username', 'Crashout');
                usernameModal.style.display = 'none';
                document.querySelector('.input-box').style.display = 'flex';
            }
        });
    } else {
        checkUsernameExists(usernameInputValue, function(exists) {
            if (exists) {
                alert('This username is already taken. Please choose another one.');
            } else {
                localStorage.setItem('username', usernameInputValue);
                usernameModal.style.display = 'none';
                document.querySelector('.input-box').style.display = 'flex';
            }
        });
    }
};

function timeAgo(timestamp) {
    const now = new Date();
    const timeDiff = now - new Date(timestamp);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}

function updateUserLevel(username) {
    userMessagesCount++;

    if (userMessagesCount >= 25) {
        userLevel = 1;
    }

    firebase.database().ref('users/' + username).set({
        username: username,
        messageCount: userMessagesCount,
        level: userLevel
    });

    levelDisplay.textContent = `Level: ${userLevel}`;
}

function updateUsersList() {
    var userListContainer = document.getElementById('userList');
    userListContainer.innerHTML = '';

    firebase.database().ref('users').once('value', function(snapshot) {
        var users = snapshot.val();
        var userNumber = 1;

        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                var user = users[key];

                if (user.username) {
                    var userListItem = document.createElement('li');
                    userListItem.textContent = userNumber + '. ' + user.username;
                    userListContainer.appendChild(userListItem);

                    userNumber++;
                }
            }
        }
    });
}

firebase.database().ref('messages').on('child_added', function(snapshot) {
    var message = snapshot.val();
    var div = document.createElement('div');
    div.classList.add('message');
    
    var displayName = message.name;
    var userRole = "Cool";
    var userColor = roles[userRole] || "#000000";

    if (message.name.toLowerCase() === 'crashout') {
        displayName = `<span class="gold-text">(Founder) </span>` + message.name;
        userColor = "#FFD700";
    } else if (userMessagesCount >= 50) {
        userRole = "Cat";
        userColor = roles["Cat"];
    }

    var timeFormatted = timeAgo(message.timestamp);

    div.innerHTML = `<strong style="color:${userColor};">${displayName}:</strong> ${message.text} <span class="timestamp">(${timeFormatted})</span>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
});

var lastMessageTime = 0;
window.sendMessage = function () {
    var text = messageInput.value.trim();

    if (!text) {
        alert('Please enter a message!');
        return;
    }

    if (text.length < 2 || text.length > 200) {
        alert('Message must be between 2 and 200 characters!');
        return;
    }

    var currentTime = new Date().getTime();
    if (currentTime - lastMessageTime < 5000) {
        alert('Please wait before sending another message!');
        return;
    }

    firebase.database().ref('messages').push({
        name: username,
        text: text,
        timestamp: new Date().toISOString()
    });

    updateUserLevel(username);

    messageInput.value = '';
    lastMessageTime = currentTime;

    updateUsersList();  
};

updateUsersList();
