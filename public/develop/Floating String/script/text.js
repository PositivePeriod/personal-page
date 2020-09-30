export class Text {
    constructor(str, font, ctx) {
        this.str = str;
        this.font = Object.assign({}, font);

        ['JeukHwang', 'PositivePeriod'].forEach((tag) => {
            if (this.str.indexOf(tag) !== -1) {
                // SPECIAL TAGS
                this.font.color = {
                    r: 200,
                    g: 100,
                    b: 100,
                    a: 1
                }
            }
        });

        ctx.font = `${this.font.fontWidth} ${this.font.fontSize}px ${this.font.fontName}`;
        ctx.fillStyle = `rgba(${this.font.color.r}, ${this.font.color.g}, ${this.font.color.b}, ${this.font.color.a})`;
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'left';

        const fontMetrics = ctx.measureText(this.str);
        this.width = Math.abs(fontMetrics.actualBoundingBoxLeft) + Math.abs(fontMetrics.actualBoundingBoxRight);
        this.height = fontSize(this.font, ctx).height;
        //this.height2 = Math.abs(fontMetrics.actualBoundingBoxAscent) + Math.abs(fontMetrics.actualBoundingBoxDescent);
    }

    draw(ctx, x, y) {
        ctx.font = `${this.font.fontWidth} ${this.font.fontSize}px ${this.font.fontName}`;
        ctx.fillStyle = `rgba(${this.font.color.r}, ${this.font.color.g}, ${this.font.color.b}, ${this.font.color.a})`;
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'left';

        ctx.fillText(this.str, x, y);
        //ctx.fillRect(x, y - this.height, this.width, this.height);
        //ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
        //ctx.fillRect(x, y - this.height2, this.width, this.height2);
    }
}

export function fontSize(font, ctx) {
    ctx.font = `${font.fontWidth} ${font.fontSize}px ${font.fontName}`;
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'left';

    const ASCII = Array.from(new Array(126 - 32 + 1), (x, i) => String.fromCharCode(i + 32)).join('');

    const fontMetrics = ctx.measureText(ASCII);
    var width = Math.abs(fontMetrics.actualBoundingBoxLeft) + Math.abs(fontMetrics.actualBoundingBoxRight);
    var height = Math.abs(fontMetrics.actualBoundingBoxAscent) + Math.abs(fontMetrics.actualBoundingBoxDescent);
    return {
        width: width,
        height: height
    }
}