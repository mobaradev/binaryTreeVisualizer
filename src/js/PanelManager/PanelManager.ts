import Main from "../Main.js";

class PanelManager {

    constructor() {
        console.log("PanelManager()");

        document.getElementById("panel-insert-button").addEventListener("click", () => this.insert());
        document.getElementById("panel-delete-button").addEventListener("click", () => this.delete());
    }

    getActionNumber() {
        return parseInt((<HTMLInputElement> document.getElementById("panel-action-number")).value);
    }

    insert() {
        let value: number = this.getActionNumber();
        Main.tree.push(value);
    }

    delete() {
        let value: number = this.getActionNumber();
        Main.tree.delete(value);

        Main.visualizer.recalculateCellsPositions();
    }
}

export default PanelManager;