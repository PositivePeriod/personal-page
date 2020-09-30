import {
    Text,
    fontSize
} from './text.js'

const TAGS = ['html', 'head', 'body', 'title', 'meta', 'div', 'a', 'script', 'link', 'img', 'span',
    'p', 'li', 'ul', 'style', 'br', 'h1', 'h2', 'input', 'form', 'h3', 'nav', 'header', 'footer', 'iframe',
    'JeukHwang', 'PositivePeriod' // SPECIAL TAGS
]

export class Marquee {
    constructor(font, pos, speed, ctx) {
        this.font = font;
        this.pos = pos;
        this.start = this.pos.start;
        this.speed = speed;

        this.texts = [];
        this.length = 0;

        this.size = fontSize(this.font, ctx);
    }

    getRandomStr() {
        var tag = TAGS[Math.floor(Math.random() * TAGS.length)];
        return ` <${tag}></${tag}>`
    }

    startMake(ctx) {
        const text = new Text(this.getRandomStr(), this.font, ctx);
        this.texts.unshift(text);
        this.length += text.width;
        this.start -= text.width;
    }

    endMake(ctx) {
        const text = new Text(this.getRandomStr(), this.font, ctx);
        this.texts.push(text);
        this.length += text.width;
    }

    erase() {
        this.length -= this.texts.pop().width;
    }

    resize(stageWidth, stageHeight, ctx) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        while (this.start + this.length <= this.stageWidth) {
            this.endMake(ctx);
        }
    }

    draw(ctx) {
        while (this.start >= 0) {
            this.startMake(ctx)
        }

        var y = (this.pos.bottom + this.pos.top) / 2 + (this.size.height) / 2;
        var current = this.start;
        var eraseIndex = this.texts.length;
        this.texts.forEach((text, index) => {
            text.draw(ctx, current, y);
            current += text.width;
            if (current > this.stageWidth) {
                eraseIndex = Math.min(eraseIndex, index);
            }
        });

        while (this.texts.length > eraseIndex + 1) {
            this.erase();
        }

        this.start += this.speed;
    }
}