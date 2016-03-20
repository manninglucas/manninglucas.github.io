//Spacefield by Lucas Manning
//
//This creates a 'traveling-through-space' effect that can be angled
//with the mouse. There is also a lightspeed mode
//
// TODO: Everything

class Star {
    constructor(canvasWidth, canvasHeight, context, speed) {
        this.ctx = context;
        this.x = Math.floor(Math.random() * canvasWidth);
        this.y = Math.floor(Math.random() * canvasHeight);
        this.z = Math.random() * 0.01;
        this.speed = speed;
        this.radius = 1;
    }

    translate() {
        this.x += this.z * (this.x - canvas.width / 2);
        this.y += this.z * (this.y - canvas.height / 2);
        this.radius = this.z * Math.sqrt(Math.pow(this.x - canvas.width / 2, 2) + Math.pow(this.y - canvas.height / 2, 2));
    }
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

function update() {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.translate();
        if (star.x > canvas.width || star.x < 0 || star.y > canvas.height || star.y < 0) {
            stars.splice(i, 1);
            stars.push(new Star(canvas.width, canvas.height, ctx, 0));
        }
    }
}

function animate(dt) {
    setTimeout(() => {
        draw();
        update();

        window.requestAnimationFrame(animate);
    }, 1000 / 60);
}

function init() {
    for (let i = 0; i < 300; ++i) {
        let s = new Star(canvas.width, canvas.height, ctx, 20);
        stars.push(s);
    }
    window.requestAnimationFrame(animate);
}

let canvas = document.getElementById('spacefield');
let ctx = canvas.getContext('2d');
let stars = [];

init();
//# sourceMappingURL=spacefield.js.map