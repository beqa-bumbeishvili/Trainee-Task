window.onload = function startGame() {
    playground.start();
}


var playground = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
    }
}