let titleElem = document.getElementById("title");
let rect = titleElem.getBoundingClientRect();
let start;
let previousTimeStamp = 0;
let done = false
let x = 0;
let y = 0;
let dx = 0.3;
let dy = 0.3;

function randomColor() {
    let h = 360 * Math.random()
    let s = (50 * Math.random()) + 50
    let l = (50 * Math.random()) + 25
    return `hsl(${h}, ${s}%, ${l}%)`
}

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const timestep = timestamp - previousTimeStamp;

    if (timestep > 0) {
        x = Math.max(-rect.left, Math.min(x + dx*timestep, window.innerWidth - rect.right - 1));
        y = Math.max(-rect.top, Math.min(y + dy*timestep, window.innerHeight - rect.bottom - 1));
        titleElem.style.transform = `translate(${x}px, ${y}px)`;
        if (x === -rect.left || x + rect.right === window.innerWidth - 1) {
            titleElem.style.color = randomColor()
            dx = -dx;
        }
        if (y === -rect.top || y + rect.bottom === window.innerHeight - 1) {
            titleElem.style.color = randomColor()
            dy = -dy;
        }
    }

    previousTimeStamp = timestamp;
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);