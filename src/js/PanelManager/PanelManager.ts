import Main from "../Main.js";

class PanelManager {

    constructor() {
        console.log("PanelManager()");

        document.getElementById("panel-insert-button").addEventListener("click", () => this.insert());
        document.getElementById("panel-delete-left-button").addEventListener("click", () => this.delete("left"));
        document.getElementById("panel-delete-right-button").addEventListener("click", () => this.delete("right"));
        document.getElementById("panel-find-button").addEventListener("click", () => this.find());
    }

    getActionNumber() {
        return parseInt((<HTMLInputElement> document.getElementById("panel-action-number")).value);
    }

    insert() {
        let value: number = this.getActionNumber();
        Main.tree.push(value);

        this.setOutputMessage(`✓ ${value.toString()} inserted.`)

        this.updateStatistics();
    }

    delete(selectionChoice: "left" | "right") {
        let value: number = this.getActionNumber();
        if (Main.tree.findCell(value)) {
            Main.tree.delete(value, selectionChoice);

            Main.visualizer.recalculateCellsPositions();

            this.setOutputMessage(`✓ ${value.toString()} deleted.`)
        } else {
            this.setOutputMessage(`${value.toString()} not deleted because it doesn't exist.`)
        }

        this.updateStatistics();
    }

    find() {
        let value: number = this.getActionNumber();

        let stepsCounter: number = Main.tree.findValue(value);

        if (stepsCounter === -1) {
            this.setOutputMessage(`${value.toString()} has not been found.`)
        } else {
            this.setOutputMessage(`${value.toString()} has been found in ${stepsCounter} steps.`)
        }

    }

    setOutputMessage(message: string) {
        document.getElementById("panel-output").innerHTML = message;
    }

    updateStatistics() {
        document.getElementById("panel-statistics-cells").innerText = Main.tree.cells.length.toString();
        document.getElementById("panel-statistics-edges").innerText = Math.max(0, Main.tree.cells.length - 1).toString();
        document.getElementById("panel-statistics-height").innerText = Main.tree.getHeight().toString();
        document.getElementById("panel-statistics-unique-values").innerText = Main.tree.getUniqueValues().length.toString();
    }
}

export default PanelManager;