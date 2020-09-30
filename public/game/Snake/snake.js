class SnakeGame {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.map = {
      'x': 20,
      'y': 20,
      'grid': 20
    }

    this.snake = {
      x: 160,
      y: 160,

      // snake velocity. moves one grid length every frame in either the x or y direction
      dx: this.map.grid,
      dy: 0,

      // keep track of all grids the snake body occupies
      cells: [],

      // length of the snake. grows when eating an apple
      maxCells: 4
    };

    this.apple = {
      x: 320,
      y: 320
    };

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' && snake.dx === 0) {
        this.snake.dx = -this.map.grid;
        snake.dy = 0;
      } else if (e.key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -this.map.grid;
        snake.dx = 0;
      } else if (e.key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = this.map.grid;
        snake.dy = 0;
      } else if (e.key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = this.map.grid;
        snake.dx = 0;
      }
    });

    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    return NaN
    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 4) {
      return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // move snake by it's velocity
    snake.x += snake.dx;
    snake.y += snake.dy;

    // wrap snake position horizontally on edge of screen
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
      snake.x = 0;
    }

    // wrap snake position vertically on edge of screen
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
      snake.y = 0;
    }

    // keep track of where snake has been. front of the array is always the head
    snake.cells.unshift({
      x: snake.x,
      y: snake.y
    });

    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    // draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // draw snake one cell at a time
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {

      // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

      // snake ate apple
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;

        // canvas is 400x400 which is 25x25 grids 
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }

      // check collision with all cells after this one (modified bubble sort)
      for (var i = index + 1; i < snake.cells.length; i++) {

        // snake occupies same space as a body part. reset game
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160;
          snake.y = 160;
          snake.cells = [];
          snake.maxCells = 4;
          snake.dx = grid;
          snake.dy = 0;

          apple.x = getRandomInt(0, 25) * grid;
          apple.y = getRandomInt(0, 25) * grid;
        }
      }
    });
  }

  resize() {
    this.canvas.width = this.map.x * this.map.grid * this.pixelRatio;
    this.canvas.height = this.map.x * this.map.grid * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

window.onload = () => {
  new SnakeGame();
}