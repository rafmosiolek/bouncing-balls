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

// defining Shape constructor
function Shape() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.velX = random(-7, 7);
    this.velY = random(-7, 7);
    this.exist = true;
}

// defining Ball constructor, inheriting from Shape()
function Ball(x, y, velX, velY, exist) {
    Shape.call(this, x, y, velX, velY, exist);

    this.color = "rgb(" + random(0,255) + "," + random(0, 255) + "," + random(0, 255) + ")";
    this.size = random(10, 20);
}

// Set Ball()'s constructor and constructor prototype
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;



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


// defining EvilCircle constructor, inheriting from Shape()
function EvilCircle(x, y, exist) {
    Shape.call(this, x, y, exist);

    this.color = "white";
    this.size = 10;
    this.velX = 20;
    this.velY = 20;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


// draws the evil circle
EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3; // outline width
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
};

// stop the evilcircle from going off the edge of the viewport
EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.velX -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.velX += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.velY -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.velY += this.size;
    }
};

// adds onkeydown evenlistener to the window object; evil circle might be moved around now
EvilCircle.prototype.setControls = function() {
    var _this = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 65) {
            _this.x -= _this.velX;
        } else if (e.keyCode === 68) {
            _this.x += _this.velX;
        } else if (e.keyCode === 87) {
            _this.y -= _this.velY;
        } else if (e.keyCode === 83) {
            _this.y += _this.velY;
        }
    };
};

// collision detection
EvilCircle.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        // checks if the ball being checked exists
        if (balls[j].exist) {
            // algorithm checks the collision of two circles (2d collision detection)
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;

            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exist = false;
            }
        }
    }
};

// array stores all created balls
var balls = [];

// new evil circle object instance
var evilBall = new EvilCircle();
// setControls method called
evilBall.setControls();

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
        // loop through every ball and call the methods functions for each one only if the current ball exists
        if (balls[i].exist === true) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
        // call evil ball instance methods on every iteration of the loop
        evilBall.draw();
        evilBall.checkBounds();
        evilBall.collisionDetect();
    }
    requestAnimationFrame(loop);
}

// function is called, animation started
loop();

















