class Food {
    constructor() {
        this.x = null;
        this.y = null;
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек
     * @param {Snake} snake объект змейки
     * @param {Board} board объект игрового поля
     */
    init(settings, snake, board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    /**
     * Метод устанавливает новое случайное положение еды на игровом
     * поле.
     */
    setNewFood() {
        const food = this.getRandomFoodCell();
        this.board.renderFood(food);
    }

    /**
     * Метод рандомно выбирает клетку, на которой будет расположена еда
     * положением на игровом поле
     * @returns {HTMLTableCellElement}  возвращает клетку, на которой будет расположена еда
     */
    getRandomFoodCell() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell = this.board.getCellEl(this.x, this.y);
            
            if (cell.classList.contains('snakeBody')) {
                continue;
            }
            return cell;
        }
    }

    /**
     * Метод устанавливает на игровом поле еду по текущим
     * координатам.
     */
    setFood() {
        let cell = this.board.getCellEl(this.x, this.y);
        this.board.renderFood(cell);
    }
}