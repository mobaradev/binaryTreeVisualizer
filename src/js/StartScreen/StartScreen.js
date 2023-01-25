import Main from "../Main.js";
var StartScreen = /** @class */ (function () {
    function StartScreen() {
        var _this = this;
        setTimeout(function () {
            document.getElementById("app-version-number").innerText = Main.appVersionNumber.toString();
        }, 1);
        document.getElementById("start-screen-start-empty-tree-button").addEventListener("click", function () { return _this.startEmptyTree(); });
        document.getElementById("start-screen-start-random-tree-button").addEventListener("click", function () { return _this.startRandomTree(); });
        document.getElementById("start-screen-about-button").addEventListener("click", function () { return _this.showAboutScreen(); });
    }
    StartScreen.prototype.startEmptyTree = function () {
        this.hide();
    };
    StartScreen.prototype.startRandomTree = function () {
        this.hide();
        Main.tree.generateRandomTree();
    };
    StartScreen.prototype.showAboutScreen = function () {
        Main.aboutScreen.show();
    };
    StartScreen.prototype.hide = function () {
        document.getElementById("start-screen").classList.add("transparent");
        setTimeout(function () {
            document.getElementById("start-screen").classList.add("hidden");
        }, 500);
    };
    return StartScreen;
}());
export default StartScreen;
//# sourceMappingURL=StartScreen.js.map