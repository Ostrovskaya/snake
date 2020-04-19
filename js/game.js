class Game {
    constructor() {
        this.tickIdentifier = null;
    }

    /** 
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings 
     * @param {Status} status
     * @param {Board} board
     * @param {Snake} snake
     * @param {Menu} menu
     * @param {Food} food
     */
    init(settings, status, board, snake, menu, food, score) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
        this.score = score;
    }

     /**
     * Метод назначает обработчики на события клика на кнопки "Старт",
     * "Пауза", а также на стрелки на клавиатуре.
     */
    initStartClickHandler() {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        this.menu.addPopUpClickListeners();
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    /**
     *Создает новую игру
     *
     * @memberof Game
     */
    createNewGame(){
        this.settings.init({ speed: 3, winLength: 50 });
        this.score.init(this.settings, {level: 1});
        this.board.deleteBoard();
        this.board.renderBoard();
        this.snake.createNewBody();
        this.snake.setFirstDirection();
        this.board.renderSnake();
        this.food.setNewFood();
        this.score.showCurrentLevel();
        this.score.showCurrentScore(this.snake.body.length);
        this.status.setPaused();
    }

    /**
     * Метод запускает игру.
     */
    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.score.showCurrentScore(this.snake.body.length);
            this.tickIdentifier = setTimeout(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    /**
     * Метод ставит игру на паузу.
     */
    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearTimeout(this.tickIdentifier);
        }
    }

     /**
     * Этот метод запускается каждую секунду и осуществляет:
     * 1. перемещение змейки
     * 2. проверяет проиграна/выиграна ли игра
     * 3. увеличивает размер змейки если она ест еду
     * 4. заново отрисовывает положение змейки и еды
     */
    doTick() {
        this.snake.performStep();
        if (this.isGameLost()) {
            this.status.setFinish();
            this.menu.showPopUp('Вы проиграли');
            return;
        }
        if (this.isGameWon()) {
            this.status.setFinish();
            this.menu.showPopUp('Вы выиграли');
            return;
        }
        if (this.board.isHeadOnFood()) {
            this.snake.increaseBody();
            this.score.showCurrentScore(this.snake.body.length);
            if(this.score.isNextLevel(this.snake.body.length)){
                this.score.changeLevel();
                this.score.showCurrentLevel();
            }
            this.food.setNewFood();
        }
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
        this.tickIdentifier = setTimeout(this.doTick.bind(this), 1000 / this.settings.speed);
    }

     /**
     * Метод проверяет выиграна ли игра
     * @returns {boolean} если длина змейки достигла длины нужной
     * для выигрыша, тогда true, иначе false.
     */
    isGameWon() {
        if (this.snake.body.length == this.settings.winLength) {
            return true;
        }
        return false;
    }

    /**
     * Метод проверяет проиграна ли игра
     * @returns {boolean} если мы шагнули в стену, тогда
     * true, иначе false.
     */
    isGameLost() {
        if (this.board.isNextStepToWall(this.snake.body[0])) {
            return true;
        }
        if (this.board.isNextStepToSnake(this.snake.body[0]) ) {
            return true;
        }
        return false;
    }


    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет 
     * вызываться соответствующий метод.
     * @param {KeyboardEvent} event 
     */
    pressKeyHandler(event) {
        console.log(event.key);
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
        }
    }

    
    
}