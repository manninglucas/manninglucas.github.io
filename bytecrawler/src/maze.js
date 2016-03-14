//maze.js
//
//Copyright Lucas Manning
//
//

import Queue from './queue.js'

class Maze {
    
    constructor(tile_size, width, height, display) {
        this.tile_size = tile_size
        this.height = height 
        this.width = width
        this.tiles = []
        this.start_tile = null
        this.end_tile = null
        this.searched = []
        this.display = display
    }

    reset() 
    {
        this.tiles = []
        this.end_tile = null
        this.start_tile = null
        this.searched = []
    }
   
    // generate random maze 
    gen_random() 
    {
        this.reset()
        for (let y = 0; y < this.height / this.tile_size; y++) {
            for (let x = 0; x < this.width / this.tile_size; x++) { 
                let wall = Math.random() <= 0.25
                let new_tile = {
                    x,
                    y,
                    type : 0,
                    parent : null,
                    dist_cost : null
                }
                
                if (wall) {
                    new_tile.type = 1
                }
                this.tiles.push(new_tile)
            }
        }

        this.start_tile = this.random_tile()
        this.end_tile = this.random_tile()
        while (this.manhattan_distance(this.start_tile) === 0) {
            this.end_tile = this.random_tile()
        }
        this.start_tile.type = 2
        this.start_tile.dist_cost = 0
        this.end_tile.type = 3
    }

    random_tile() {  
        return this.tiles[Math.floor(Math.random() * 
                            this.width * this.height /
                            Math.pow(this.tile_size, 2)
                         )]
    }

    //generate recursive backtrack maze
    generateRecursiveBacktrack() {
        
    }

    //this is a formal apology for the following method. I'm sorry.
    tile_in_bounds(og_tile, tile)
    {
        return tile != undefined && 
            (
                (Math.abs(og_tile.x - tile.x) == 1 
                 && Math.abs(og_tile.y - tile.y) == 0) 
            || 
                (Math.abs(og_tile.x - tile.x) == 0 
                 && Math.abs(og_tile.y - tile.y) == 1)
            )
    }

    
    tile_is_empty(tile) 
    {
        return tile.type !== 1 
    }

    neighbors(tile)
    {
        let index = this.tile_index(tile)
        let og_tile = this.tiles[index]
        let indicies = [index+1,index-1,index+50,index-50]
        let tile_neighbors = []
        for (let index of indicies) {
            let tile = this.tiles[index]
            if (this.tile_in_bounds(og_tile, tile) 
                && this.tile_is_empty(tile)) {
                tile_neighbors.push(tile)
            }
        }
        return tile_neighbors
    }

    manhattan_distance(tile) 
    {
        let dx = Math.abs(tile.x - this.end_tile.x)
        let dy = Math.abs(tile.y - this.end_tile.y)

        return 1 * (dx + dy)
    }

    tile_index(tile)
    {
        return tile.x + (tile.y * 50)
    }

    a_star_search(delay=20)
    {
        let frontier = new Queue()
        frontier.add(0, this.start_tile)
        this.searched.push(this.start_tile)

        let search_loop = setInterval(() => {

            if (frontier.empty()) { clearInterval(search_loop) }

            let current = frontier.get()
            
            //manahttan dist of zero means the current tile is the end_tile
            if (this.manhattan_distance(current) === 0) {
                console.log("goal reached")
                this.trace_path()
                //break
                clearInterval(search_loop)
            }

            for (let tile of this.neighbors(current)) {
                let cost = current.dist_cost + 1
                let searched_index = this.searched.indexOf(tile)
                if (searched_index === -1 || 
                    cost < this.searched[searched_index].dist_cost) {
                    tile.dist_cost = cost
                    let priority = cost + this.manhattan_distance(tile)
                    tile.parent = this.tile_index(current)
                    if (tile !== this.end_tile) {tile.type = 4}
                    this.searched.push(tile)
                    frontier.add(priority, tile)
                }
                
            }
            this.display.render(this)    
        
        }, delay)
    }

    trace_path()
    {
        let tile = this.tiles[this.end_tile.parent]
        while (tile.parent != null) {
            if (tile !== this.start_tile) {    
                tile.type = 5
            }
            tile = this.tiles[tile.parent]
        }
    }
}
export default Maze
