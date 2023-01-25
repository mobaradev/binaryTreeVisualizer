import Main from "../Main.js";
var PanelManager = /** @class */ (function () {
    function PanelManager() {
        var _this = this;
        console.log("PanelManager()");
        document.getElementById("panel-insert-button").addEventListener("click", function () { return _this.insert(); });
        document.getElementById("panel-delete-left-button").addEventListener("click", function () { return _this.delete("left"); });
        document.getElementById("panel-delete-right-button").addEventListener("click", function () { return _this.delete("right"); });
        document.getElementById("panel-find-button").addEventListener("click", function () { return _this.find(); });
        document.getElementById("panel-about-button").addEventListener("click", function () { return Main.aboutScreen.show(); });
        document.getElementById("panel-action-number").value = "1";
    }
    PanelManager.prototype.getActionNumber = function () {
        return parseInt(document.getElementById("panel-action-number").value);
    };
    PanelManager.prototype.insert = function () {
        var value = this.getActionNumber();
        Main.tree.push(value);
        this.setOutputMessage("\u2713 ".concat(value.toString(), " inserted."));
        this.updateStatistics();
        Main.canvasManager.animate();
    };
    PanelManager.prototype.delete = function (selectionChoice) {
        var value = this.getActionNumber();
        if (Main.tree.findCell(value)) {
            Main.tree.delete(value, selectionChoice);
            Main.visualizer.recalculateCellsPositions();
            this.setOutputMessage("\u2713 ".concat(value.toString(), " deleted."));
            Main.canvasManager.animate();
        }
        else {
            this.setOutputMessage("".concat(value.toString(), " not deleted because it doesn't exist."));
        }
        this.updateStatistics();
    };
    PanelManager.prototype.find = function () {
        var value = this.getActionNumber();
        var stepsCounter = Main.tree.findValue(value);
        if (stepsCounter === -1) {
            this.setOutputMessage("".concat(value.toString(), " has not been found."));
        }
        else {
            this.setOutputMessage("".concat(value.toString(), " has been found in ").concat(stepsCounter, " steps."));
        }
    };
    PanelManager.prototype.setOutputMessage = function (message) {
        document.getElementById("panel-output").innerHTML = message;
    };
    PanelManager.prototype.updateStatistics = function () {
        document.getElementById("panel-statistics-cells").innerText = Main.tree.cells.length.toString();
        document.getElementById("panel-statistics-edges").innerText = Math.max(0, Main.tree.cells.length - 1).toString();
        document.getElementById("panel-statistics-height").innerText = Main.tree.getHeight().toString();
        document.getElementById("panel-statistics-unique-values").innerText = Main.tree.getUniqueValues().length.toString();
    };
    return PanelManager;
}());
export default PanelManager;
//# sourceMappingURL=PanelManager.js.map