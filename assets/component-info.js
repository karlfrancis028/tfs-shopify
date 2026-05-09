document.addEventListener('DOMContentLoaded', function() {
    const infoButton = document.querySelector('.info-button');
    const infoDisplay = document.querySelector('.info-display');

    if (infoButton && infoDisplay) {
        infoButton.addEventListener('click', function() {
            infoDisplay.classList.toggle('visible');
        });
    }
});