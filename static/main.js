let titleElem = document.getElementById("title-image");
let rect = titleElem.getBoundingClientRect();
let x = 0;
let y = 0;
let dx = 0.3;
let dy = 0.3;
let previousTimeStamp = 0;
let id = 0;

function step(timestamp) {
    const timestep = timestamp - previousTimeStamp;

    if (timestep > 0) {
        x = Math.max(-rect.left, Math.min(x + dx*timestep, window.innerWidth - rect.right - 1));
        y = Math.max(-rect.top, Math.min(y + dy*timestep, window.innerHeight - rect.bottom - 1));
        setTransform("");
        if (x === -rect.left || x + rect.right === window.innerWidth - 1) {
            setFilter(randomColor());
            dx = -dx;
        }
        if (y === -rect.top || y + rect.bottom === window.innerHeight - 1) {
            setFilter(randomColor());
            dy = -dy;
        }
        setTransform(`translate(${x}px, ${y}px)`);
    }
    titleElem.style.display = 'none';
    titleElem.style.display = 'block';

    previousTimeStamp = timestamp;
    window.requestAnimationFrame(step);
}

function reset() {
    window.cancelAnimationFrame(id);
    x = 0;
    y = 0;
    dx = 0.3;
    dy = 0.3;
    setFilter("grayscale(100%) brightness(1000%)");
    setTransform("translate(0px, 0px)");
    rect = titleElem.getBoundingClientRect();
    id = window.requestAnimationFrame(step);
}

function randomColor() {
    let deg = Math.random() * 360
    return `hue-rotate(${deg}deg)`; 
}

function setTransform(val) {
    titleElem.style.transform = val;
    titleElem.style.webkitTransform = val;
}

function setFilter(val) {
    titleElem.style.filter = val;
    titleElem.style.webkitFilter = val;
}


window.addEventListener("resize", (e) => {
    reset();
})

document.addEventListener("DOMContentLoaded", () => {
    reset();
})
