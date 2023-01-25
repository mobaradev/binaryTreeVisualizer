var Random = /** @class */ (function () {
    function Random() {
    }
    Random.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return Random;
}());
export default Random;
//# sourceMappingURL=Random.js.map