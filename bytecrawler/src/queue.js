//queue.js
//
//Copyright Lucas Manning
//


class Queue {
    constructor()
    {
        this.items = []
    }

    add(priority, element) 
    {
        if (!this.empty()) {
            let index = 0
            while (index < this.items.length
                  && priority > this.items[index][0]) {
                  index++
            }
            let item = [priority, element]

            this.items.splice(index, 0, item)
        } else {
            this.items.push([priority, element])
        }
    }

    empty()
    {
        return this.items.length === 0
    }

    get()
    {
        return this.items.shift()[1]
    }
}

export default Queue
