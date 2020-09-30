export class Block {
    constructor(type, x, y, size) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;

        this.margin = 2;

        this.bridge = 3;
        this.pass = {
            0: this.bridge,
            1: this.bridge,
            2: this.bridge,
            3: this.bridge,
        };
        this.color = 'rgba(0, 0, 0, 0.6)';
        this.setBlockType();
    }

    resize(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        for (const [key, value] of Object.entries(this.pass)) {
            if (value > 0) {
                let i = 1;
                let j = 1;
                switch (key) {
                    case '0':
                        i = 2;
                        break;
                    case '1':
                        j = 0
                        break;
                    case '2':
                        i = 0;
                        break;
                    case '3':
                        j = 2;
                        break;
                }
                switch (value) {
                    case 1:
                        ctx.strokeStyle = 'rgba(79, 234, 255, 1.0)';
                        break;
                    case 2:
                        ctx.strokeStyle = 'rgba(79, 185, 255, 1.0)';
                        break;
                    case 3:
                        ctx.strokeStyle = 'rgba(79, 103, 255, 1.0)';
                        break;
                }

                ctx.beginPath();
                ctx.moveTo(this.x + this.size / 2, this.y + this.size / 2);
                ctx.lineTo(this.x + this.size / 2 * i, this.y + this.size / 2 * j);
                ctx.stroke();
            }
        }
    }

    changeBlockType(type) {
        this.type = type;
        this.setBlockType();
    }

    setBlockType() {
        switch (this.type) {
            case ' ':
            case 'E':
            case 'empty':
                this.color = 'rgba(255, 255, 255, 0)';
                this.pass = false;
                break;
            case 'W':
            case 'water':
                this.color = 'rgba(0, 120, 255, 0.6)';
                break;
            case 'B':
            case 'barrier':
                this.color = 'rgba(0, 0, 0, 0.8)';
                this.pass = false;
                break;
            case 'L':
            case 'lava':
                this.color = 'rgba(255, 60, 0, 0.7)';
                this.pass = false;
                break;
            case 'G':
            case 'ground':
                break;
            default:
                alert('No matched block type for ' + this.type.toString())
        }
    }
}