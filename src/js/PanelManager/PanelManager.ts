import Main from "../Main.js";

class PanelManager {

    constructor() {
        console.log("PanelManager()");

        document.getElementById("panel-insert-button").addEventListener("click", () => this.insert());
        document.getElementById("panel-delete-left-button").addEventListener("click", () => this.delete("left"));
        document.getElementById("panel-delete-right-button").addEventListener("click", () => this.delete("right"));
    }

    getActionNumber() {
        return parseInt((<HTMLInputElement> document.getElementById("panel-action-number")).value);
    }

    insert() {
        let value: number = this.getActionNumber();
        Main.tree.push(value);

        this.setOutputMessage(`✓ ${value.toString()} inserted.`)
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
    }

    find(value: number) {

    }

    setOutputMessage(message: string) {
        document.getElementById("panel-output").innerHTML = message;
    }
}

export default PanelManager;