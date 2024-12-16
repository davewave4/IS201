let gameRunning = false;
let score = 0;
let playerCar, obstacle1, obstacle2;
let gameInterval, obstacleInterval;

function startGame() {
    gameRunning = true;
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;

    playerCar = document.getElementById("playerCar");
    obstacle1 = document.getElementById("obstacle1");
    obstacle2 = document.getElementById("obstacle2");

    // Initialize obstacles
    obstacle1.style.left = getRandomLane() + "px";
    obstacle2.style.left = getRandomLane() + "px";

    // Start the game loop
    gameInterval = setInterval(updateGame, 20);
    obstacleInterval = setInterval(updateObstacles, 20);

    // Add key event listeners
    document.addEventListener("keydown", movePlayer);
}

function movePlayer(e) {
    const roadWidth = document.getElementById("road").offsetWidth;
    const carWidth = playerCar.offsetWidth;

    if (e.key === "ArrowLeft") {
        const leftPosition = parseInt(window.getComputedStyle(playerCar).left);
        if (leftPosition > 0) {
            playerCar.style.left = (leftPosition - 20) + "px";
        }
    }

    if (e.key === "ArrowRight") {
        const leftPosition = parseInt(window.getComputedStyle(playerCar).left);
        if (leftPosition < roadWidth - carWidth) {
            playerCar.style.left = (leftPosition + 20) + "px";
        }
    }
}

function updateGame() {
    // Check for collision
    if (checkCollision(playerCar, obstacle1) || checkCollision(playerCar, obstacle2)) {
        endGame();
        return;
    }

    // Update score
    score++;
    document.getElementById("score").innerText = "Score: " + score;
}

function updateObstacles() {
    moveObstacle(obstacle1);
    moveObstacle(obstacle2);
}

function moveObstacle(obstacle) {
    const roadHeight = document.getElementById("road").offsetHeight;

    let topPosition = parseInt(window.getComputedStyle(obstacle).top);
    if (topPosition > roadHeight) {
        obstacle.style.top = "-120px"; // Reset to top
        obstacle.style.left = getRandomLane() + "px"; // Change lane
    } else {
        obstacle.style.top = (topPosition + 5) + "px"; // Move down
    }
    let obstacleSpeed = 5; // Initial speed
let speedIncrement = 0.5; // Speed increase per level
let levelInterval = 10000; // Increase speed every 10 seconds

function increaseDifficulty() {
  obstacleSpeed += speedIncrement;
}

setInterval(increaseDifficulty, levelInterval);

function moveObstacles() {
  document.querySelectorAll('.obstacle').forEach(obstacle => {
    let currentTop = parseInt(window.getComputedStyle(obstacle).top);
    if (currentTop >= 600) {
      obstacle.remove();
      score++;
      updateScore();
    } else {
      obstacle.style.top = currentTop + obstacleSpeed + "px";
    }
  });
}
}

function getRandomLane() {
    const lanes = [50, 125, 200]; // Possible positions for obstacles
    return lanes[Math.floor(Math.random() * lanes.length)];
}

function checkCollision(car, obstacle) {
    const carRect = car.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        carRect.top > obstacleRect.bottom ||
        carRect.bottom < obstacleRect.top ||
        carRect.left > obstacleRect.right ||
        carRect.right < obstacleRect.left
    );
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    gameRunning = false;
    alert("Game Over! Your score: " + score);
}
