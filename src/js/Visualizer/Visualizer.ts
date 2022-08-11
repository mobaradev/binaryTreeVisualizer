import CanvasManager from "../CanvasManager/CanvasManager.js";
import Tree from "../Tree/Tree.js";
import Cell from "../Tree/Cell/Cell.js";
import InputManager from "../InputManager/InputManager.js";

class Visualizer {
    canvasManager: CanvasManager;
    tree: Tree;
    lastUpdateOnNumberOfOperations: number;
    shiftX: number;
    shiftY: number;
    zoom: number;

    constructor(canvasManager: CanvasManager, tree: Tree) {
        console.log("Visualizer()");
        this.canvasManager = canvasManager;
        this.tree = tree;

        this.lastUpdateOnNumberOfOperations = -1;

        this.shiftX = 0;
        this.shiftY = 0;
        this.zoom = 1.0;

        setInterval(() => {
            this.update();
        }, 1000/30);
    }

    update() {
        this.draw();

        if (this.tree.numberOfOperations > this.lastUpdateOnNumberOfOperations) {
            this.recalculateCellsPositions();
            this.lastUpdateOnNumberOfOperations = this.tree.numberOfOperations;
        }

        const shiftSize = 16 * (1/this.zoom >= 1 ? 1/this.zoom : 1);

        if (InputManager.keyboard.w) {
            this.shiftY += shiftSize;
        } else if (InputManager.keyboard.s) {
            this.shiftY -= shiftSize;
        }

        if (InputManager.keyboard.a) {
            this.shiftX += shiftSize;
        } else if (InputManager.keyboard.d) {
            this.shiftX -= shiftSize;
        }

        if (InputManager.keyboard.z) {
            this.zoom -= 0.1;
            if (this.zoom <= 0.1) this.zoom = 0.1;
        } else if (InputManager.keyboard.x) {
            this.zoom += 0.1;
        }
    }

    recalculateCellsPositions() {
        console.log("recalculating...")
        let rootCell = this.tree.rootCell;
        this.recalculateCell(rootCell);
    }

    recalculateCell(cell: Cell) {
        if (cell.side === 0) {
            console.log("side - 0")
            cell.positionX = 0;
            cell.positionY = 0;

            if (cell.childLeft) this.recalculateCell(cell.childLeft);
            if (cell.childRight) this.recalculateCell(cell.childRight);
            return;
        }

        if (cell.side === -1) {
            console.log("side - -1")
            cell.calculatePositionX();
            cell.calculatePositionY();
            if (cell.childLeft) this.recalculateCell(cell.childLeft);
            if (cell.childRight) this.recalculateCell(cell.childRight);
        } else if (cell.side === 1) {
            console.log("side - 1")
            // shiftX += cell.calculateLeftChildrenSpace();
            cell.calculatePositionX();
            cell.calculatePositionY();
            if (cell.childLeft) this.recalculateCell(cell.childLeft);
            if (cell.childRight) this.recalculateCell(cell.childRight);
        }
    }

    draw() {
        let { cells } = this.tree;
        let { ctx } = this.canvasManager;

        // background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);

        // lines
        this.drawLines();

        // cells
        let rootCell = this.tree.rootCell;
        let cellTmp = rootCell;

        this.drawCellWithChildren(rootCell);



        // cells
        // for (let cell of cells) {
        //     let positionX: number = cell.calculatePositionX();
        //     let positionY: number = cell.calculatePositionY();
        //     let x: number = positionX * 100;
        //     let y: number = positionY * 100;
        //     ctx.beginPath();
        //     ctx.arc(x, y, 50, 0, 2 * Math.PI);
        //     ctx.stroke();
        // }
    }

    drawCell(cell: Cell) {
        let { ctx } = this.canvasManager;
        let x: number = cell.positionX;
        let y: number = cell.positionY;

        ctx.strokeStyle = "white";
        ctx.lineWidth = 1 * this.zoom;
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.calculateRealPositionX(x), this.calculateRealPositionY(y), 50 * this.zoom, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "yellow";
        // ctx.font = "26px verdana, sans-serif";
        let fontSize: number = Math.round(26 * this.zoom);
        ctx.font = `${fontSize}px arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(cell.value.toString(), this.calculateRealPositionX(x), this.calculateRealPositionY(y), 100 * this.zoom);
    }

    drawLines() {
        for (let cell of this.tree.cells) {
            if (cell.childLeft) this.drawLine(cell, cell.childLeft);
            if (cell.childRight) this.drawLine(cell, cell.childRight);
        }
    }

    calculateRealPositionX(positionX: number) {
        return positionX * 100 * this.zoom + 1000 + this.shiftX * this.zoom;
    }

    calculateRealPositionY(positionY: number) {
        return positionY * 100 * this.zoom + 200 + this.shiftY * this.zoom;
    }

    drawLine(cellA: Cell, cellB: Cell) {
        let { ctx } = this.canvasManager;

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1 * this.zoom;
        ctx.moveTo(this.calculateRealPositionX(cellA.positionX), this.calculateRealPositionY(cellA.positionY));
        ctx.lineTo(this.calculateRealPositionX(cellB.positionX), this.calculateRealPositionY(cellB.positionY));
        ctx.stroke();
        ctx.closePath();
    }

    drawCellWithChildren(cell: Cell) {
        this.drawCell(cell);
        if (cell.childLeft) this.drawCellWithChildren(cell.childLeft);
        if (cell.childRight) this.drawCellWithChildren(cell.childRight);
    }
}

export default Visualizer;