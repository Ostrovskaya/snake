/** Здесь будет хранится статус игры, например играем мы, завершили или остановлено. */
class Status {
    constructor() {
        this.condition = 'no play'
    }

    /** Это значит что мы играем. */
    setPlaying() {
        this.condition = 'playing';
    }

    /** Это значит что игра на паузе. */
    setPaused() {
        this.condition = 'paused';
    }

    /** Это значит что игра закончена. */
    setFinish() {
        this.condition = 'no play';
    }

    /**
     * @returns {boolean} если мы сейчас играем, тогда true, иначе false.
     */
    isPlaying() {
        return this.condition === 'playing';
    }

    /**
     * @returns {boolean} если сейчас игра на паузе, тогда true, иначе false.
     */
    isPaused() {
        return this.condition === 'paused';
    }
}