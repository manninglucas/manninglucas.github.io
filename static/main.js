let titleElem = document.getElementById("title");
let rect = titleElem.getBoundingClientRect();
let previousTimeStamp = 0;
let x = 0;
let y = 0;
let dx = 0.3;
let dy = 0.3;

function randomColor() {
    let deg = Math.random() * 360
    return `hue-rotate(${deg}deg)`; 
}

function step(timestamp) {
    const timestep = timestamp - previousTimeStamp;

    if (timestep > 0) {
        x = Math.max(-rect.left, Math.min(x + dx*timestep, window.innerWidth - rect.right - 1));
        y = Math.max(-rect.top, Math.min(y + dy*timestep, window.innerHeight - rect.bottom - 1));
        titleElem.style.transform = `translate(${x}px, ${y}px)`;
        if (x === -rect.left || x + rect.right === window.innerWidth - 1) {
            titleElem.style.filter = randomColor() 
            dx = -dx;
        }
        if (y === -rect.top || y + rect.bottom === window.innerHeight - 1) {
            titleElem.style.filter = randomColor() 
            dy = -dy;
        }
    }

    previousTimeStamp = timestamp;
    window.requestAnimationFrame(step);
}

let id = window.requestAnimationFrame(step);

window.addEventListener("resize", (e) => {
    window.cancelAnimationFrame(id);
    titleElem.style.transform = `translate(0px, 0px)`;
    titleElem.style.filter = `grayscale(100%) brightness(1000%)`;
    x = 0;
    y = 0;
    rect = titleElem.getBoundingClientRect();
    id = window.requestAnimationFrame(step);
})