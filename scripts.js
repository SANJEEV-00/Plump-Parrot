const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 480;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const BIRD_SIZE = 20;
const GRAVITY = 0.6;
const LIFT = -10;
const PIPE_WIDTH = 40;
const PIPE_GAP = 100;

let bird;
let pipes = [];
let frame = 0;

class Bird {
    constructor() {
        this.x = 50;
        this.y = CANVAS_HEIGHT / 2;
        this.velocity = 0;
    }

    show() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, BIRD_SIZE, BIRD_SIZE);
    }

    update() {
        this.velocity += GRAVITY;
        this.y += this.velocity;

        if (this.y > CANVAS_HEIGHT - BIRD_SIZE) {
            this.y = CANVAS_HEIGHT - BIRD_SIZE;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    up() {
        this.velocity += LIFT;
    }
}

class Pipe {
    constructor() {
        this.top = Math.floor(Math.random() * (CANVAS_HEIGHT / 2));
        this.bottom = CANVAS_HEIGHT - (this.top + PIPE_GAP);
        this.x = CANVAS_WIDTH;
        this.width = PIPE_WIDTH;
    }

    show() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, CANVAS_HEIGHT - this.bottom, this.width, this.bottom);
    }

    update() {
        this.x -= 2;
    }

    offscreen() {
        return this.x < -this.width;
    }
}

function setup() {
    bird = new Bird();
    pipes.push(new Pipe());
    loop();
}

function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    bird.show();
    bird.update();

    if (frame % 90 === 0) {
        pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    frame++;
}

function loop() {
    draw();
    requestAnimationFrame(loop);
}

function keyPressed() {
    bird.up();
}

function mousePressed() {
    bird.up();
}

setup();
document.addEventListener('keydown', keyPressed);
document.addEventListener('mousedown', mousePressed);
