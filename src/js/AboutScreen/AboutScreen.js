var AboutScreen = /** @class */ (function () {
    function AboutScreen() {
        var _this = this;
        document.getElementById("about-screen-x-button").addEventListener("click", function () { return _this.hide(); });
    }
    AboutScreen.prototype.show = function () {
        console.log('show');
        this.hide();
    };
    AboutScreen.prototype.hide = function () {
        var box = document.getElementById("about-screen");
        if (box.classList.contains('hidden')) {
            box.classList.remove('hidden');
            setTimeout(function () {
                box.classList.remove('transparent');
            }, 20);
        }
        else {
            box.classList.add('transparent');
            setTimeout(function () {
                box.classList.add('hidden');
            }, 500);
        }
    };
    return AboutScreen;
}());
export default AboutScreen;
//# sourceMappingURL=AboutScreen.js.map