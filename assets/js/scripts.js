window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
  

    setTimeout(() => {
      loadingScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
    }, 2500); 
  });


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    window.location.href = 'https://www.google.com/search?q=How+do+I+learn+to+code';
});

  