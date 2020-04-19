class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
        this.yesBtnEl = document.querySelector('.yes');
        this.noBtnEl = document.querySelector('.no');
        this.popUp = document.querySelector('.popUp');
        this.messageEl = document.querySelector('.message');
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Game} game объект настроек
     */
    init(game) {
        this.game = game;
    }

    /**
     * Метод назначает переданные функции в качестве обработчиков
     * событий клика на кнопки "Старт" и "Пауза".
     * @param {Function} startBtnClickHandler 
     * @param {Function} pauseBtnClickHandler 
     */
    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }

    showPopUp(text){
        this.popUp.classList.remove('hidden');
        this.messageEl.innerText = text;
    }

    /**
     * Метод назначает переданные функции в качестве обработчиков
     * событий клика на кнопки "Да" и "Нет".
     */
    addPopUpClickListeners() {
        this.yesBtnEl.addEventListener('click', this.clickButtonOnHandler.bind(this));
        this.noBtnEl.addEventListener('click', this.clickButtonNoHandler.bind(this));
    }

    clickButtonOnHandler(){
        this.popUp.classList.add('hidden'); 
        this.game.createNewGame();
    }
    
    clickButtonNoHandler(){
        this.popUp.classList.add('hidden'); 
    }

    
}