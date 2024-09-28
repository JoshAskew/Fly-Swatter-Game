let randomSelectionInterval;
let score = 0;

function resetGame() {
    score = 0; // Reset score
    document.getElementById('score').textContent = `Score: ${score}`; // Update score display
    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => {
        item.classList.remove('selected');
        item.style.backgroundImage = ''; // Clear background image
    });
    startRandomSelection(); // Restart random selection
    startTimer(30); // Restart timer
}

function updateScore() {
    score += 1; // Increment score
    document.getElementById('score').textContent = `Score: ${score}`; // Update score display
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 64) + 1; // Random number between 1 and 64
}

function selectRandomGridItem() {
    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => item.classList.remove('selected'));

    const randomIndex = generateRandomNumber() - 1;
    items[randomIndex].classList.add('selected');
}

function changeBackgroundImage(item) {
    item.style.backgroundImage = "url('./images/splatfly.jpg')";
}

function addClickEventToItems() {
    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('selected')) {
                changeBackgroundImage(item);
                updateScore();
            }
        });
    });
}

function startRandomSelection() {
    randomSelectionInterval = setInterval(selectRandomGridItem, 800);
}

function startTimer(duration) {
    let timer = duration;
    const timerDisplay = document.getElementById('timer-number');

    const countdownInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;

        if (timer < 0) {
            clearInterval(countdownInterval);
            clearInterval(randomSelectionInterval);
            if (confirm("Time's up! Do you want to play again?")) {
                resetGame(); // Reset the game if the user wants to play again
            } else {
                alert("Thank you for playing!");
            }
        }
    }, 1000);
}

startRandomSelection();
startTimer(30);
addClickEventToItems();