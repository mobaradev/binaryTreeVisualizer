class Random {
    static getRandomNumber(min, max) : number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default Random;