class Score {
    constructor() {
        this.currentScore = document.querySelector('.currentScore');
        this.level = document.querySelector('.level');
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек
     */
    init(settings, param) {
        this.settings = settings;
        this.currentLevel = param.level;
    }

    /**
     *Устанавливает начальный уровень
     *
     * @memberof Score
     */
    setStartLevel(){
        this.currentLevel = 1;
    }

    /**
     *Выводит на экран текущий уровень сложности
     *
     * @memberof Score
     */
    showCurrentLevel(){
        this.level.innerHTML = this.currentLevel;
    }

    /**
     *Переход на следующий уровень
     *
     * @memberof Score
     */
    changeLevel(){
        this.currentLevel ++;
        this.settings.speed += 1;
    }

    isNextLevel(lenghtSnake){
        return lenghtSnake % 5 === 0
    }


    /**
     *Выводит на экран текущий счет игры
     *
     * @param {*} currentLength
     * @memberof Score
     */
    showCurrentScore(currentLength){
        this.currentScore.innerHTML = currentLength;
    }


}