import Cell from "./Cell/Cell.js";
import Main from "../Main.js";

class Tree {
    cells: Cell[];
    rootCell: Cell | null;
    numberOfOperations: number;

    constructor() {
        console.log("Tree()");
        this.cells = [];
        this.numberOfOperations = 0;

        // this.cells.push(new Cell(this,0));

    }

    init() {
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
        this.push(1)
        this.push(15)
        this.push(18)
        this.push(17)
        this.push(55)
        this.push(50)
        this.push(51)
        this.push(0)
        // this.push(50.524324)
        this.push(12)
        this.push(14)

        // this.delete(15);

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

        console.log(this.cells[1].value)
        console.log("test -> " + this.cells[1].calculateNumberOfDescendants("left"));

        // setTimeout(() => {
        //     this.push(17);
        // }, 300);
    }

    push(value: number) {
        if (!this.rootCell) {
            this.rootCell = new Cell(this, value);
            this.rootCell.setSide(0);
            this.cells.push(this.rootCell);
            console.log("Pushed root cell: " + value);
            return;
        }

        let newCell = new Cell(this, value);
        let side: -1 | 1 = (value >= this.rootCell.value ? 1 : -1);
        newCell.setSide(side);
        this.cells.push(newCell);

        let cellTmp = this.rootCell;
        let isFinished = false;

        while (!isFinished) {
            if (value >= cellTmp.value) {
                if (cellTmp.childRight) {
                    cellTmp = cellTmp.childRight;
                } else {
                    cellTmp.childRight = newCell;
                    newCell.parent = cellTmp;
                    isFinished = true;
                    console.log(`${value} pushed on the right.`)
                }
            } else {
                if (cellTmp.childLeft) {
                    cellTmp = cellTmp.childLeft;
                } else {
                    cellTmp.childLeft = newCell;
                    newCell.parent = cellTmp;
                    isFinished = true;
                    console.log(`${value} pushed on the left.`)
                }
            }
        }
        this.numberOfOperations++;
    }

    findValue(value: number) {
        let cellTmp = this.rootCell;

        let isFinished = false;
        let isFound = false;

        let stepsCounter = 0;

        while (!isFinished) {
            if (value > cellTmp.value) {
                if (cellTmp.childRight) {
                    cellTmp = cellTmp.childRight;
                } else {
                    isFinished = true;
                    isFound = false;
                }
            } else if (value < cellTmp.value) {
                if (cellTmp.childLeft) {
                    cellTmp = cellTmp.childLeft;
                } else {
                    isFinished = true;
                    isFound = false;
                }
            } else {
                isFinished = true;
                isFound = true;
            }
            stepsCounter++;
        }

        console.log(`IsFound: ${isFound} in ${stepsCounter} steps.`);
        if (!isFound) return -1;
        else {
            return stepsCounter;
        }
    }

    findCell(value: number) {
        let cellTmp = this.rootCell;

        while (true) {
            if (value > cellTmp.value) {
                if (cellTmp.childRight) {
                    cellTmp = cellTmp.childRight;
                } else {
                    return null;
                }
            } else if (value < cellTmp.value) {
                if (cellTmp.childLeft) {
                    cellTmp = cellTmp.childLeft;
                } else {
                    return null;
                }
            } else {
                return cellTmp;
            }
        }
    }

    delete(value: number, selectionChoice: "left" | "right") {
        let cell = this.findCell(value);
        if (!cell) return;

        let parentTmp: Cell = cell.parent;
        let incomingCell: Cell;
        let newConnectionCell: Cell; // find better name

        if (!cell.childLeft && !cell.childRight) {
            incomingCell = null;
            newConnectionCell = null;
        } else {
            if ((selectionChoice === "left" && cell.childLeft) || !cell.childRight) {
                incomingCell = cell.childLeft;
                newConnectionCell = incomingCell.getHighestDescendant();

                if (cell.childRight) {
                    cell.childRight.parent = newConnectionCell;
                    newConnectionCell.childRight = cell.childRight;
                }
            } else {
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
                if (incomingCell) incomingCell.parent = parentTmp;
            } else {
                parentTmp.childLeft = incomingCell;
                if (incomingCell) incomingCell.parent = parentTmp;
            }
        } else {
            if (incomingCell) {
                incomingCell.parent = null;
                this.rootCell = incomingCell;
            } else {
                this.rootCell = null;
            }
        }

        cell.childLeft = null;
        cell.childRight = null;
        cell.parent = null;

        this.cells.splice(this.cells.indexOf(cell), 1);
    }

    getHeight() : number {
        let height = 0;

        this.cells.forEach(cell => {
            let numberOfPredecessors = 0;
            let parentTmp = cell.parent;
            while (parentTmp) {
                numberOfPredecessors++;
                parentTmp = parentTmp.parent;
            }

            if (numberOfPredecessors + 1 > height) {
                height = numberOfPredecessors + 1;
            }
        })

        return height;
    }

    getUniqueValues() {
        let uniqueValues = [];

        this.cells.forEach(cell => {
            if (uniqueValues.indexOf(cell.value) === -1) uniqueValues.push(cell.value);
        })

        return uniqueValues;
    }
}

export default Tree;