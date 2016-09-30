var square;

window.onload = function startGame() {
    playground.start();
    square = new setValues(30, 30, "red", 10, 130);
}

var playground = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, 30);
        window.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 37:
                    square.horizontalStep -= 2;
                    square.makeStep();
                    break;
                case 38:
                    square.verticalStep -= 2;
                    square.makeStep();
                    break;
                case 39:
                    square.horizontalStep += 2;
                    square.makeStep();
                    break;
                case 40:
                    square.verticalStep += 2;
                    square.makeStep();
                    break;
            }
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
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
   
}

function update() {
    playground.clear();
    square.horizontalStep = 0;
    square.verticalStep = 0;
    square.fill();
}


