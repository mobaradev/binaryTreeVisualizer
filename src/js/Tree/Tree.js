import Cell from "./Cell/Cell.js";
var Tree = /** @class */ (function () {
    function Tree() {
        console.log("Tree()");
        this.cells = [];
        this.numberOfOperations = 0;
        // this.cells.push(new Cell(this,0));
    }
    Tree.prototype.init = function () {
        // this.push(10)
        // this.push(9)
        // this.push(7)
        // this.push(8)
        // this.push(2)
        // this.push(3)
        // this.push(6)
        // this.push(4)
        // this.push(5)
        // this.push(0)
        this.push(1);
        this.push(15);
        this.push(18);
        this.push(17);
        this.push(55);
        this.push(50);
        this.push(51);
        this.push(0);
        this.push(50.524324);
        this.push(12);
        this.push(14);
        this.delete(15);
        // this.push(22);
        // this.push(21);
        // this.push(16);
        // this.push(15);
        // this.push(17);
        // this.push(18);
        // this.push(19);
        // this.push(1);
        this.findValue(-5);
        this.findValue(-1);
        this.findValue(-15);
        this.findValue(-4);
        console.log(this.cells[1].value);
        console.log("test -> " + this.cells[1].calculateNumberOfDescendants("left"));
        // setTimeout(() => {
        //     this.push(17);
        // }, 300);
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
                    console.log(value + " pushed on the right.");
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
                    console.log(value + " pushed on the left.");
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
        console.log("IsFound: " + isFound + " in " + stepsCounter + " steps.");
    };
    Tree.prototype.findCell = function (value) {
        var cellTmp = this.rootCell;
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
    Tree.prototype.delete = function (value) {
        var cell = this.findCell(value);
        if (cell.isRoot()) {
            // special case
        }
        else {
            var parentTmp = cell.parent;
            var incomingCell = void 0;
            var newConnectionCell = void 0; // find better name
            var selectionChoice = "right";
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
            if (cell.isParentOnLeft()) {
                parentTmp.childRight = incomingCell;
                incomingCell.parent = parentTmp;
            }
            else {
                parentTmp.childLeft = incomingCell;
                incomingCell.parent = parentTmp;
            }
            cell.childLeft = null;
            cell.childRight = null;
            cell.parent = null;
        }
    };
    return Tree;
}());
export default Tree;
//# sourceMappingURL=Tree.js.map