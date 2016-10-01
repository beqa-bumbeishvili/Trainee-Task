var square;
var obstacle;
var obstacleArray = [];

window.onload = function startGame() {
    playground.start();
    square = new setValues(30, 30, "red", 10, 130);
    obstacle = new setValues(10, 115, "green", 500, 120);
    //obstacleArray.push(obstacle);
}

var playground = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(update, 30);
        window.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 37:
                    square.horizontalStep -= 4;
                    square.makeStep();
                    break;
                case 38:
                    square.verticalStep -= 4;
                    square.makeStep();
                    break;
                case 39:
                    square.horizontalStep += 4;
                    square.makeStep();
                    break;
                case 40:
                    square.verticalStep += 4;
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

function everyinterval(n) {
    if ((playground.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function setValues(w, h, color, co_x, co_y) {
    this.width = w;
    this.height = h;
    this.x = co_x;
    this.y = co_y;
    this.fill = function () {
        ctx = playground.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.horizontalStep = 0;
    this.verticalStep = 0;
    this.makeStep = function () {
        this.x += this.horizontalStep;
        this.y += this.verticalStep;
    }
    this.crash = function (obstacle) {  //check if square edge touches obstacle
        if (((this.y + this.height) < obstacle.y) || (this.y > (obstacle.y + obstacle.height)) || ((this.x + this.width) < obstacle.x) || (this.x > (obstacle.x + (obstacle.width)))) {
            return false;
        }
        else return true;
    }
}

function update() {
    for (var i = 0; i < obstacleArray.length; i++) {
        if (square.crash(obstacleArray[i])) {
            playground.gameOver();
        }
    }

    playground.clear();
    playground.frameNo += 1;
    var x, y;
    if (playground.frameNo == 1 || everyinterval(50)) {
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
        obstacleArray[i].x -= 4;
        obstacleArray[i].fill();
    }
}

