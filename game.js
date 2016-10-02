var square;
var squareSpeed = 4;
var obstacle;
var obstacleArray = [];
var obstacleSpeed = 4;
var obstacleRepeat = 50;
var sound;

function startGame() {
    playground.start();
    square = new setValues(30, 30, "red", 10, 130);
    obstacle = new setValues(10, 115, "green", 500, 120);
    sound = new Audio("sounds/soundtrack.mp3");
    sound.play();
}

var playground = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.scoreCounter = 0;
        this.frameCounter = 0;
        this.scoreCounter = 0;
        this.interval = setInterval(update, 30);
        window.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 37:
                    square.horizontalStep -= squareSpeed;
                    square.makeStep();
                    break;
                case 38:
                    square.verticalStep -= squareSpeed;
                    square.makeStep();
                    break;
                case 39:
                    square.horizontalStep += squareSpeed;
                    square.makeStep();
                    break;
                case 40:
                    square.verticalStep += squareSpeed;
                    square.makeStep();
                    break;
            }
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    gameOver: function () {
        clearInterval(this.interval);
    }
}

function stopMusicPlay() {
    if (!sound.paused) {
        sound.pause();
    }
    else sound.play();
}

function obstacleDest(frame) {
    if ((playground.frameCounter / frame) % 1 == 0) { return true; }
    return false;
}

function setValues(w, h, background, co_x, co_y) {
    this.width = w;
    this.height = h;
    this.x = co_x;
    this.y = co_y;
    this.squareStyle = background;
    var isImage = false;
    if (background.includes(".")) {
        isImage = true;
        this.image = new Image();
        this.image.src = background;
    }
    ctx = playground.context;
    this.fill = function () {
        if (isImage) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else {
            ctx.fillStyle = background;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.score = function () {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Your score:", 290, 25);
        ctx.fillText(playground.scoreCounter, 450, 25);
    }
    this.horizontalStep = 0;
    this.verticalStep = 0;
    this.makeStep = function () {
        this.x += this.horizontalStep;
        this.y += this.verticalStep;
        if (this.x < 0) this.x = 0;
        if (this.x > 470) this.x = 470;
        if (this.y < 0) this.y = 0;
        if (this.y > 250) this.y = 250;
    }
    this.crash = function (obstacle) {  //check if square edge touches obstacle
        if (((this.y + this.height) < obstacle.y) || (this.y > (obstacle.y + obstacle.height)) || ((this.x + this.width) < obstacle.x) || (this.x > (obstacle.x + (obstacle.width)))) {
            return false;
        }
        else return true;
    }
}


function getFileName(path) {
    return path.replace(/^.*[\\\/]/, '');
}

function changeSquare() {
    if (getFileName(square.squareStyle) == "red")
        square = new setValues(30, 30, "images/flappy.png", square.x, square.y);
    else if (getFileName(square.squareStyle) == "flappy.png")
        square = new setValues(30, 30, "images/dino.png", square.x, square.y);
    else square = new setValues(30, 30, "red", square.x, square.y);

}


function update() {
    for (var i = 0; i < obstacleArray.length; i++) {
        if (square.crash(obstacleArray[i])) {
            playground.gameOver();
            sound.pause();
            swal({ title: "crash!", text: "you hit the wall!", type: "error", confirmButtonText: "OK" }, function () {
                location.reload();
            });
        }
    }

    playground.clear();
    playground.frameCounter += 1;
    if (playground.frameCounter > 50 && obstacleDest(obstacleRepeat) == true) {
        playground.scoreCounter += 10;
    }
    var x;
    if (playground.frameCounter == 1 || obstacleDest(obstacleRepeat) == true) {
        x = playground.canvas.height;
        minHeight = 50;
        maxHeight = 115;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight); //50-115
        minGap = 50;
        maxGap = 100;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap); //50-200
        obstacleArray.push(new setValues(10, height, "green", 500, 0));
        obstacleArray.push(new setValues(10, x - (height + gap), "green", 500, height + gap));
    }
    square.horizontalStep = 0;
    square.verticalStep = 0;
    square.fill();
    for (i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].x -= obstacleSpeed + Math.floor((playground.scoreCounter/50));
        obstacleArray[i].fill();
        obstacleArray[i].score();
    }
}

