export class Player {
    constructor(x, y, map) {
        this.x = x;
        this.y = y;
        this.map = map;

        this.size = this.map.grid;
        this.margin = 8;
        this.color = 'rgba(230, 84, 84, 0.9)';
    }

    resize() {
        this.size = this.map.grid;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        var pos = this.map.coordinate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(pos.x + this.size / 2, pos.y + this.size / 2, this.size/6, 0, Math.PI * 2, false);
        ctx.fill();
    }

    move(name, direction) {
        var x = (this.x + direction[0]+this.map.x) % this.map.x
        var y = (this.y + direction[1]+this.map.x) % this.map.y
        if ((0 <= x && x < this.map.x) && (0 <= y && y < this.map.y)) {
            if (this.map.data[x][y].pass[(name+2)%4] > 0) {
                var ask = null;
                while (ask === null) {
                    var ask = prompt( 'Change Bridge life\nCurrent : '+this.map.data[this.x][this.y].pass[name].toString(), this.map.data[this.x][this.y].pass[name]);
                    if (ask === null || parseInt(ask) === NaN) {
                        return null
                    }
                    if ((parseInt(ask)-ask !== 0) || (ask.length !== parseInt(ask).toString.length)) {
                        ask = null;
                        continue
                    }
                    ask = parseInt(ask);
                    if (!(0 < ask && ask <= this.map.data[this.x][this.y].pass[name])) {
                        ask = null;
                    }
                }
                this.map.data[this.x][this.y].pass[name] -= ask;
                this.map.data[x][y].pass[(name+2)%4] -= ask;
                this.x = x;
                this.y = y;
            }
        }
    }
}