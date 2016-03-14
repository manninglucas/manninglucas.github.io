//display.js
//
//Copyright Lucas Manning
//

class Display {

    constructor(tile_size, canvas) {
        this.tile_size = tile_size
        this.canvas = canvas 
        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = '#000000'
    }

    render(maze) {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        for (let tile of maze.tiles) {
            switch (tile.type) {
                case 0:
                    this.ctx.fillStyle = '#d3d3d3'
                    this.draw_tile(tile)
                    break
                case 1:
                    this.ctx.fillStyle = '#000000'
                    this.draw_tile(tile)
                    break
                case 2:
                    this.ctx.fillStyle = '#00FF00'
                    this.draw_tile(tile)
                    break
                case 3:
                    this.ctx.fillStyle = '#FF0000'
                    this.draw_tile(tile)
                    break
                case 4:
                    this.ctx.fillStyle = '#0000FF'
                    this.draw_tile(tile)
                    break
                case 5:
                    this.ctx.fillStyle = '#FFA500'
                    this.draw_tile(tile)
                    break
            }
        }
    }

    draw_tile(tile)
    {
        this.ctx.fillRect(tile.x*10, tile.y*10, 10, 10)
    }
}

export default Display
