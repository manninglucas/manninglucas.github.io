//main.js
//
//Copyright Lucas Manning
//

import Maze from './maze.js'
import Display from './display.js'

let canvas = document.getElementById("main")
let solve_button = document.getElementById("solve")
let gen_button = document.getElementById('generate')
const tile_size = 10
const delay = 20

let myDisplay = new Display(tile_size, canvas)

let myMaze = new Maze(tile_size, canvas.width, canvas.height, myDisplay)

myMaze.gen_random()
myDisplay.render(myMaze)

solve_button.addEventListener("click", () => {
    console.log("solving...")
    myMaze.a_star_search(delay)
})

gen_button.addEventListener("click", () => {
    console.log("generating...")
    myMaze.gen_random()
    myDisplay.render(myMaze)
})
