import Cell from "./Cell/Cell.js";
import Main from "../Main.js";
import Random from "../Random/Random.js";
var Tree = /** @class */ (function () {
    function Tree() {
        console.log("Tree()");
        this.cells = [];
        this.numberOfOperations = 0;
    }
    Tree.prototype.init = function () {
        setTimeout(function () {
            Main.panelManager.updateStatistics();
        }, 10);
    };
    Tree.prototype.generateRandomTree = function () {
        var min = 0;
        var max = 32;
        var n = 10;
        for (var i = 0; i < n; i++) {
            this.push(Random.getRandomNumber(min, max));
        }
        Main.panelManager.updateStatistics();
    };
    Tree.prototype.push = function (value) {
        if (!this.rootCell) {
            this.rootCell = new Cell(this, value);
            this.rootCell.setSide(0);
            this.cells.push(this.rootCell);
            console.log("Pushed root cell: " + value);
            return;
        }
        var newCell = new Cell(this, value);
        var side = (value >= this.rootCell.value ? 1 : -1);
        newCell.setSide(side);
        this.cells.push(newCell);
        var cellTmp = this.rootCell;
        var isFinished = false;
        while (!isFinished) {
            if (value >= cellTmp.value) {
                if (cellTmp.childRight) {
                    cellTmp = cellTmp.childRight;
                }
                else {
                    cellTmp.childRight = newCell;
                    newCell.parent = cellTmp;
                    isFinished = true;
                    console.log("".concat(value, " pushed on the right."));
                }
            }
            else {
                if (cellTmp.childLeft) {
                    cellTmp = cellTmp.childLeft;
                }
                else {
                    cellTmp.childLeft = newCell;
                    newCell.parent = cellTmp;
                    isFinished = true;
                    console.log("".concat(value, " pushed on the left."));
                }
            }
        }
        this.numberOfOperations++;
    };
    Tree.prototype.findValue = function (value) {
        var cellTmp = this.rootCell;
        var isFinished = false;
        var isFound = false;
        var stepsCounter = 0;
        while (!isFinished) {
            if (value > cellTmp.value) {
                if (cellTmp.childRight) {
                    cellTmp = cellTmp.childRight;
                }
                else {
                    isFinished = true;
                    isFound = false;
                }
            }
            else if (value < cellTmp.value) {
                if (cellTmp.childLeft) {
                    cellTmp = cellTmp.childLeft;
                }
                else {
                    isFinished = true;
                    isFound = false;
                }
            }
            else {
                isFinished = true;
                isFound = true;
            }
            stepsCounter++;
        }
        console.log("IsFound: ".concat(isFound, " in ").concat(stepsCounter, " steps."));
        if (!isFound)
            return -1;
        else {
            return stepsCounter;
        }
    };
    Tree.prototype.findCell = function (value) {
        var cellTmp = this.rootCell;
        if (!cellTmp)
            return null;
        while (true) {
            if (value > cellTmp.value) {
                if (cellTmp.childRight) {
                    cellTmp = cellTmp.childRight;
                }
                else {
                    return null;
                }
            }
            else if (value < cellTmp.value) {
                if (cellTmp.childLeft) {
                    cellTmp = cellTmp.childLeft;
                }
                else {
                    return null;
                }
            }
            else {
                return cellTmp;
            }
        }
    };
    Tree.prototype.delete = function (value, selectionChoice) {
        var cell = this.findCell(value);
        if (!cell)
            return;
        var parentTmp = cell.parent;
        var incomingCell;
        var newConnectionCell; // find better name
        if (!cell.childLeft && !cell.childRight) {
            incomingCell = null;
            newConnectionCell = null;
        }
        else {
            if ((selectionChoice === "left" && cell.childLeft) || !cell.childRight) {
                incomingCell = cell.childLeft;
                newConnectionCell = incomingCell.getHighestDescendant();
                if (cell.childRight) {
                    cell.childRight.parent = newConnectionCell;
                    newConnectionCell.childRight = cell.childRight;
                }
            }
            else {
                incomingCell = cell.childRight;
                newConnectionCell = incomingCell.getLowestDescendant();
                if (cell.childLeft) {
                    // if selection choice is right, then there still can be a left child to handle
                    cell.childLeft.parent = newConnectionCell;
                    newConnectionCell.childLeft = cell.childLeft;
                }
            }
        }
        if (!cell.isRoot()) {
            if (cell.isParentOnLeft()) {
                parentTmp.childRight = incomingCell;
                if (incomingCell)
                    incomingCell.parent = parentTmp;
            }
            else {
                parentTmp.childLeft = incomingCell;
                if (incomingCell)
                    incomingCell.parent = parentTmp;
            }
        }
        else {
            if (incomingCell) {
                incomingCell.parent = null;
                this.rootCell = incomingCell;
            }
            else {
                this.rootCell = null;
            }
        }
        cell.childLeft = null;
        cell.childRight = null;
        cell.parent = null;
        this.cells.splice(this.cells.indexOf(cell), 1);
    };
    Tree.prototype.getHeight = function () {
        var height = 0;
        this.cells.forEach(function (cell) {
            var numberOfPredecessors = 0;
            var parentTmp = cell.parent;
            while (parentTmp) {
                numberOfPredecessors++;
                parentTmp = parentTmp.parent;
            }
            if (numberOfPredecessors + 1 > height) {
                height = numberOfPredecessors + 1;
            }
        });
        return height;
    };
    Tree.prototype.getUniqueValues = function () {
        var uniqueValues = [];
        this.cells.forEach(function (cell) {
            if (uniqueValues.indexOf(cell.value) === -1)
                uniqueValues.push(cell.value);
        });
        return uniqueValues;
    };
    return Tree;
}());
export default Tree;
//# sourceMappingURL=Tree.js.map