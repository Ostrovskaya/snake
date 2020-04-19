'use stript';

window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const menu = new Menu();
    const food = new Food();
    const game = new Game();
    const score = new Score();

    game.init(settings, status, board, snake, menu, food, score);
    board.init(settings, snake);
    food.init(settings, snake, board);
    snake.init(settings);
    menu.init(game);
    game.createNewGame();
    game.initStartClickHandler();
});