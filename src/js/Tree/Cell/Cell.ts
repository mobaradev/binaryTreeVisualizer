import Tree from "../Tree.js";


class Cell {
    positionX: number;
    positionY: number;

    side: -1 | 0 | 1 | undefined;

    value: number;
    tree: Tree;

    parent: Cell | null;
    childLeft: Cell | null;
    childRight: Cell | null;

    constructor(tree: Tree, value) {
        console.log("Cell()");
        this.tree = tree;
        this.value = value;
        this.positionX = 0;
        this.positionY = 0;

        this.side = undefined;
    }

    setSide(side: -1 | 0 | 1) {
        this.side = side;
    }

    isRoot() {
        return !this.parent;
    }

    isLeaf() {
        return !!(this.childRight || this.childLeft);
    }

    isParentOnLeft() {
        if (!this.parent) return false;
        return this.parent.childRight === this;
    }

    calculateNumberOfDescendants(side: "left" | "both" | "right") {
        if (side === "both") {
            let fromLeftChild = (this.childLeft ? this.calculateNumberOfDescendants("left") : 0);
            let fromRightChild = (this.childRight ? this.calculateNumberOfDescendants("right") : 0);

            return fromLeftChild + fromRightChild + 1;
        }

        if (side === "right") {
            return (this.childRight ? this.childRight.calculateNumberOfDescendants("both") : 0);
        } else if (side === "left") {
            return (this.childLeft ? this.childLeft.calculateNumberOfDescendants("both") : 0);
        }
    }

    calculateNumberOfAncestors() {
        if (this.isRoot()) return 0;

        let counter = 1;
        let ancestorTmp = this.parent;

        while (!ancestorTmp.isRoot()) {
            counter += 1;
            ancestorTmp = ancestorTmp.parent;
        }

        return counter;
    }

    calculatePositionX() {
        if (this.isRoot()) {
            this.positionX = 0;
        } else {
            if (this.side === -1) {
                let parentSideFactor = (!this.isParentOnLeft() ? 1 : -1);
                // console.log(this.value + ": number of right descendants = " + this.calculateNumberOfDescendants("right"));
                if (!this.isParentOnLeft()) {
                    this.positionX = this.parent.positionX - this.calculateNumberOfDescendants("right") - parentSideFactor;
                } else {
                    this.positionX = this.parent.positionX + this.calculateNumberOfDescendants("left") - parentSideFactor;
                }


                console.log(this.value + ": position x = " + this.positionX);
            } else if (this.side === 1) {
                // to do
                let parentSideFactor = (!this.isParentOnLeft() ? 1 : -1);

                if (this.isParentOnLeft()) {
                    this.positionX = this.parent.positionX + this.calculateNumberOfDescendants("left") - parentSideFactor;
                } else {
                    this.positionX = this.parent.positionX - this.calculateNumberOfDescendants("right") - parentSideFactor;
                }
            }
        }
    }

    calculatePositionY() {
        if (this.isRoot()) {
            this.positionY = 0;
        } else {
            this.positionY = this.calculateNumberOfAncestors();
        }
    }

    getHighestDescendant() {
        if (!this.childRight) return this;
        else return this.childRight.getHighestDescendant();
    }

    getLowestDescendant() {
        if (!this.childLeft) return this;
        else return this.childLeft.getLowestDescendant();
    }

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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

export default Cell;