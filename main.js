// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// function constructor for new ball item
function Ball() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.velX = random(-7, 7);
    this.velY = random(-7, 7);
    this.color = "rgb(" + random(0,255) + "," + random(0, 255) + "," + random(0, 255) + ")";
    this.size = random(10, 20);
}

// function draws ball
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

// updating the ball's data, changing velocity when ball reach the edge of the viewport
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

// collision detection
Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        // checks if current ball being looped through is NOT the same ball
        if (!(this === balls[j])) {
            // algorithm checks the collision of two circles (2d collision detection)
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;

            var distance = Math.sqrt(dx * dx + dy * dy);
            // if collision is detected, balls are changing colours
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
            }
        }
    }
};

// array stores all created balls
var balls = [];

// an animation loop
function loop() {
    // 0.4 value leaves the trail behind the ball
    ctx.fillStyle = "rgba(44, 62, 80, 0.4)";
    ctx.fillRect(0, 0, width, height);

    // setting up a maximum numbers of balls on the screen
    while (balls.length < 30) {     
        var ball = new Ball();
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

// function is called, animation started
loop();

















