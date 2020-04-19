class Board {
    constructor() {
        this.boardEl = document.getElementById('game');
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек.
     * @param {Snake} snake объект змейки.
     */
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }

    /**
     *Очищает поле
     *
     * @memberof Board
     */
    deleteBoard(){
        this.boardEl.innerHTML = '';
    }

    /**
     * Метод отрисовывает игровое поле.
     */
    renderBoard() {
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    /**
     * Является ли следующий шаг, шагом в стену.
     * @param {Object} nextCellCoords - координаты ячейки, куда змейка собирается сделать шаг.
     * @param {number} nextCellCoords.x
     * @param {number} nextCellCoords.y
     * @returns {boolean}
     */
    isNextStepToWall(nextCellCoords) {
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        return nextCell === null;
    }

    /**
     * Метод отрисовывает змейку на доске.
     */
    renderSnake() {
        const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
        if (snakeBodyElems) {
            snakeBodyElems.forEach(function(tdEl) {
                tdEl.classList.add('snakeBody');
                tdEl.style.borderRadius = "";
            })
        }
        this.setStyleSnake(snakeBodyElems);     
    }

    /**
     *Задает округление змейке
     *
     * @param {*} snakeBody
     * @memberof Board
     */
    setStyleSnake(snakeBody){
        if(snakeBody.length == 1){
            snakeBody[0].style.borderRadius = "15px 15px 15px 15px";
            return;
        }

        switch (this.snake.direction) {
            case "down":
                snakeBody[0].style.borderRadius = "0 0 15px 15px";
                break;
            case "up":
                snakeBody[0].style.borderRadius = "15px 15px 0 0";
                break;
            case "left":
                snakeBody[0].style.borderRadius = "15px 0 0 15px";
                break;
            case "right":
                snakeBody[0].style.borderRadius = "0 15px 15px 0";
                break;
        }

        switch (this.getCurrentLastCell()) {
            case "down":
                snakeBody[snakeBody.length - 1].style.borderRadius = "15px 15px 0 0";
                break;
            case "up":
                snakeBody[snakeBody.length - 1].style.borderRadius = "0 0 15px 15px";
                break;
            case "left":
                snakeBody[snakeBody.length - 1].style.borderRadius = "0 15px 15px 0";
                break;
            case "right":
                snakeBody[snakeBody.length - 1].style.borderRadius = "15px 0 0 15px";
                break;
        }


    }

    /**
     *Определяет направление движения последней клетки змейки
     *
     * @returns
     * @memberof Board
     */
    getCurrentLastCell(){
        let snakeLastCell = this.snake.body[this.snake.body.length - 1];
        let snakeBeforeLastCell = this.snake.body[this.snake.body.length - 2];

        if(snakeLastCell.x < snakeBeforeLastCell.x){
            return "right";
        }
        if(snakeLastCell.x > snakeBeforeLastCell.x){
            return "left";
        }
        if(snakeLastCell.y > snakeBeforeLastCell.y){
            return "up";
        }
        if(snakeLastCell.y < snakeBeforeLastCell.y){
            return "down";
        }

    }
    /**
     * Получаем ячейку таблицы.
     * @param {number} x координата по оси х.
     * @param {number} y координата по оси y.
     * @returns {HTMLTableCellElement} тег td
     */
    getCellEl(x, y) {
        return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    /**
     * Получаем набор тегов td, представляющих тело змейки.
     * @param {array} bodyCoords массив объектов с координатами
     * @returns {HTMLTableCellElement[]|null} возвращается набор тегов td если были
     * переданы координаты, иначе null.
     */
    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (let value of bodyCoords) {
                let elem = this.getCellEl(value.x, value.y);
                bodyElems.push(elem);
            }
            return bodyElems;
        }
        return null;
    }

     /**
     * Метод очищает игровое поле.
     */
    clearBoard() {
        const tdElems = document.querySelectorAll('td');
        tdElems.forEach(function(td) {
            td.className = "";
        });
    }

    /**
     * Метод рисует еду на игровом поле.
     * @param {HTMLTableCellElement} coords клетка, на которой нужно отрисовать еду
     */
    renderFood(coords) {
        coords.classList.add('food');
        coords.style.borderRadius = "15px 15px 15px 15px";
    }


    /**
     *Является ли следующий шаг, шагом в змейку.
     *
     * @param {Object} nextCellCoords - координаты ячейки, куда змейка собирается сделать шаг.
     * @returns
     * @memberof Board
     */
    isNextStepToSnake(nextCellCoords){
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y)    
        return nextCell.classList.contains('snakeBody');
    }

    /**
     * Метод проверяет съела ли змейка еду.
     * @returns {boolean} true если змейка находится на еде, иначе false.
     */
    isHeadOnFood() {
        return this.boardEl.querySelector('.food').classList.contains('snakeBody');
    }
}