import InputManager from "../InputManager/InputManager.js";
var Visualizer = /** @class */ (function () {
    function Visualizer(canvasManager, tree) {
        var _this = this;
        console.log("Visualizer()");
        this.canvasManager = canvasManager;
        this.tree = tree;
        this.lastUpdateOnNumberOfOperations = -1;
        this.shiftX = 0;
        this.shiftY = 0;
        this.isInMove = false;
        this.zoom = 1.0;
        setInterval(function () {
            _this.update();
        }, 1000 / 30);
    }
    Visualizer.prototype.update = function () {
        this.draw();
        if (this.tree.numberOfOperations > this.lastUpdateOnNumberOfOperations) {
            this.recalculateCellsPositions();
            this.lastUpdateOnNumberOfOperations = this.tree.numberOfOperations;
        }
        var shiftSize = 16 * (1 / this.zoom >= 1 ? 1 / this.zoom : 1);
        if (InputManager.keyboard.w) {
            this.shiftY += shiftSize;
        }
        else if (InputManager.keyboard.s) {
            this.shiftY -= shiftSize;
        }
        if (InputManager.keyboard.a) {
            this.shiftX += shiftSize;
        }
        else if (InputManager.keyboard.d) {
            this.shiftX -= shiftSize;
        }
        if (InputManager.keyboard.z) {
            this.zoom -= 0.1;
            if (this.zoom <= 0.1)
                this.zoom = 0.1;
        }
        else if (InputManager.keyboard.x) {
            this.zoom += 0.1;
        }
        if (InputManager.cursor.scroll > 0) {
            this.zoom *= 0.9;
        }
        else if (InputManager.cursor.scroll < 0) {
            this.zoom *= 1.1;
        }
        if (this.zoom < 0)
            this.zoom = 0;
        // mouse click
        if (InputManager.cursor.leftPress && !this.isInMove) {
            this.isInMove = true;
            this.moveStartPositionX = this.shiftX;
            this.moveStartPositionY = this.shiftY;
        }
        if (this.isInMove && !InputManager.cursor.leftPress) {
            this.isInMove = false;
        }
        if (this.isInMove) {
            this.shiftX = this.moveStartPositionX + InputManager.cursor.x - InputManager.cursor.leftPressX;
            this.shiftY = this.moveStartPositionY + InputManager.cursor.y - InputManager.cursor.leftPressY;
        }
    };
    Visualizer.prototype.recalculateCellsPositions = function () {
        console.log("recalculating...");
        var rootCell = this.tree.rootCell;
        this.recalculateCell(rootCell);
    };
    Visualizer.prototype.recalculateCell = function (cell) {
        if (!cell)
            return;
        if (cell.side === 0) {
            console.log("side - 0");
            cell.positionX = 0;
            cell.positionY = 0;
            if (cell.childLeft)
                this.recalculateCell(cell.childLeft);
            if (cell.childRight)
                this.recalculateCell(cell.childRight);
            return;
        }
        if (cell.side === -1) {
            console.log("side - -1");
            cell.calculatePositionX();
            cell.calculatePositionY();
            if (cell.childLeft)
                this.recalculateCell(cell.childLeft);
            if (cell.childRight)
                this.recalculateCell(cell.childRight);
        }
        else if (cell.side === 1) {
            console.log("side - 1");
            // shiftX += cell.calculateLeftChildrenSpace();
            cell.calculatePositionX();
            cell.calculatePositionY();
            if (cell.childLeft)
                this.recalculateCell(cell.childLeft);
            if (cell.childRight)
                this.recalculateCell(cell.childRight);
        }
    };
    Visualizer.prototype.draw = function () {
        var cells = this.tree.cells;
        var ctx = this.canvasManager.ctx;
        // background
        ctx.fillStyle = "aliceblue";
        ctx.fillRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);
        // lines
        this.drawLines();
        // cells
        var rootCell = this.tree.rootCell;
        var cellTmp = rootCell;
        if (rootCell)
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
    };
    Visualizer.prototype.drawCell = function (cell) {
        var ctx = this.canvasManager.ctx;
        var x = cell.positionX;
        var y = cell.positionY;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1 * this.zoom;
        ctx.fillStyle = "rgba(16, 187, 209, 1)";
        ctx.beginPath();
        ctx.arc(this.calculateRealPositionX(x), this.calculateRealPositionY(y), 50 * this.zoom, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "yellow";
        // ctx.font = "26px verdana, sans-serif";
        var fontSize = Math.round(26 * this.zoom);
        ctx.font = "".concat(fontSize, "px arial");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(cell.value.toString(), this.calculateRealPositionX(x), this.calculateRealPositionY(y), 100 * this.zoom);
    };
    Visualizer.prototype.drawLines = function () {
        for (var _i = 0, _a = this.tree.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            if (cell.childLeft)
                this.drawLine(cell, cell.childLeft);
            if (cell.childRight)
                this.drawLine(cell, cell.childRight);
        }
    };
    Visualizer.prototype.calculateRealPositionX = function (positionX) {
        return positionX * 100 * this.zoom + 1000 + this.shiftX * this.zoom;
    };
    Visualizer.prototype.calculateRealPositionY = function (positionY) {
        return positionY * 100 * this.zoom + 200 + this.shiftY * this.zoom;
    };
    Visualizer.prototype.drawLine = function (cellA, cellB) {
        var ctx = this.canvasManager.ctx;
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1 * this.zoom;
        ctx.moveTo(this.calculateRealPositionX(cellA.positionX), this.calculateRealPositionY(cellA.positionY));
        ctx.lineTo(this.calculateRealPositionX(cellB.positionX), this.calculateRealPositionY(cellB.positionY));
        ctx.stroke();
        ctx.closePath();
    };
    Visualizer.prototype.drawCellWithChildren = function (cell) {
        this.drawCell(cell);
        if (cell.childLeft)
            this.drawCellWithChildren(cell.childLeft);
        if (cell.childRight)
            this.drawCellWithChildren(cell.childRight);
    };
    return Visualizer;
}());
export default Visualizer;
//# sourceMappingURL=Visualizer.js.map