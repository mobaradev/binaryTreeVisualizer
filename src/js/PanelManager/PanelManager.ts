import Main from "../Main.js";

class DescriptionBox {
    constructor() {
        this.clear();
        document.getElementById("test").addEventListener("mouseleave", () => this.clear());

        document.getElementById("panel-insert-button").addEventListener("mouseover", () => this.setContent("insert"));
        document.getElementById("panel-delete-button").addEventListener("mouseover", () => this.setContent("delete"));
        document.getElementById("panel-find-button").addEventListener("mouseover", () => this.setContent("find"));
    }

    clear() {
        document.getElementById("panel-description-insert").style.display = "none";
        document.getElementById("panel-description-delete").style.display = "none";
        document.getElementById("panel-description-find").style.display = "none";
    }

    setContent(contentName: "insert" | "delete" | "find") {
        this.clear();
        document.getElementById(`panel-description-${contentName}`).style.display = "block";
    }
}

class PanelManager {
    descriptionBox: DescriptionBox;

    constructor() {
        console.log("PanelManager()");
        this.descriptionBox = new DescriptionBox();

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