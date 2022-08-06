var Cell = /** @class */ (function () {
    function Cell(tree, value) {
        console.log("Cell()");
        this.tree = tree;
        this.value = value;
        this.positionX = 0;
        this.positionY = 0;
        this.side = undefined;
    }
    Cell.prototype.setSide = function (side) {
        this.side = side;
    };
    Cell.prototype.isRoot = function () {
        return !this.parent;
    };
    Cell.prototype.isLeaf = function () {
        return !!(this.childRight || this.childLeft);
    };
    Cell.prototype.isParentOnLeft = function () {
        if (!this.parent)
            return false;
        return this.parent.childRight === this;
    };
    Cell.prototype.calculateNumberOfDescendants = function (side) {
        if (side === "both") {
            var fromLeftChild = (this.childLeft ? this.calculateNumberOfDescendants("left") : 0);
            var fromRightChild = (this.childRight ? this.calculateNumberOfDescendants("right") : 0);
            return fromLeftChild + fromRightChild + 1;
        }
        if (side === "right") {
            return (this.childRight ? this.childRight.calculateNumberOfDescendants("both") : 0);
        }
        else if (side === "left") {
            return (this.childLeft ? this.childLeft.calculateNumberOfDescendants("both") : 0);
        }
    };
    Cell.prototype.calculateNumberOfAncestors = function () {
        if (this.isRoot())
            return 0;
        var counter = 1;
        var ancestorTmp = this.parent;
        while (!ancestorTmp.isRoot()) {
            counter += 1;
            ancestorTmp = ancestorTmp.parent;
        }
        return counter;
    };
    Cell.prototype.calculatePositionX = function () {
        if (this.isRoot()) {
            this.positionX = 0;
        }
        else {
            if (this.side === -1) {
                var parentSideFactor = (!this.isParentOnLeft() ? 1 : -1);
                // console.log(this.value + ": number of right descendants = " + this.calculateNumberOfDescendants("right"));
                if (!this.isParentOnLeft()) {
                    this.positionX = this.parent.positionX - this.calculateNumberOfDescendants("right") - parentSideFactor;
                }
                else {
                    this.positionX = this.parent.positionX + this.calculateNumberOfDescendants("left") - parentSideFactor;
                }
                console.log(this.value + ": position x = " + this.positionX);
            }
            else if (this.side === 1) {
                // to do
                var parentSideFactor = (!this.isParentOnLeft() ? 1 : -1);
                if (this.isParentOnLeft()) {
                    this.positionX = this.parent.positionX + this.calculateNumberOfDescendants("left") - parentSideFactor;
                }
                else {
                    this.positionX = this.parent.positionX - this.calculateNumberOfDescendants("right") - parentSideFactor;
                }
            }
        }
    };
    Cell.prototype.calculatePositionY = function () {
        if (this.isRoot()) {
            this.positionY = 0;
        }
        else {
            this.positionY = this.calculateNumberOfAncestors();
        }
    };
    Cell.prototype.getHighestDescendant = function () {
        if (!this.childRight)
            return this;
        else
            return this.childRight.getHighestDescendant();
    };
    Cell.prototype.getLowestDescendant = function () {
        if (!this.childLeft)
            return this;
        else
            return this.childLeft.getLowestDescendant();
    };
    // calculateRightChildrenSpace() {
    //     if (!this.childRight) return 0;
    //
    //     return this.childRight.calculateBothChildrenSpace();
    // }
    // calculateLeftChildrenSpace() {
    //     if (!this.childLeft) return 0;
    //
    //     return this.childLeft.calculateBothChildrenSpace();
    // }
    //
    // calculateBothChildrenSpace() {
    //     let space = 0;
    //     if (this.childLeft) {
    //         space += this.childLeft.calculateBothChildrenSpace();
    //     }
    //     if (this.childRight) {
    //         space += this.childRight.calculateBothChildrenSpace();
    //     }
    //
    //     return space + 1;
    // }
    //
    // calculatePositionX() {
    //     let positionX: number = 0;
    //     let tmpCell = this.tree.rootCell;
    // }
    //
    // calculatePositionY() {
    //     let positionY: number = 0;
    //     let tmpCell: Cell = this;
    //
    //     while (!tmpCell.isRoot()) {
    //         positionY += 1;
    //         tmpCell = tmpCell.parent;
    //     }
    //
    //     return positionY;
    // }
    Cell.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
    };
    return Cell;
}());
export default Cell;
//# sourceMappingURL=Cell.js.map