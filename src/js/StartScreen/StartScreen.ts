import Main from "../Main.js";

class StartScreen {
    constructor() {
        setTimeout(() => {
            document.getElementById("app-version-number").innerText = Main.appVersionNumber.toString();
        },1);

        document.getElementById("start-screen-start-empty-tree-button").addEventListener("click", () => this.startEmptyTree());
        document.getElementById("start-screen-start-random-tree-button").addEventListener("click", () => this.startRandomTree());
    }

    startEmptyTree() {
        this.hide();
    }

    startRandomTree() {
        this.hide();
        Main.tree.generateRandomTree();
    }

    hide() {
        document.getElementById("start-screen").classList.add("transparent");

        setTimeout(() => {
            document.getElementById("start-screen").classList.add("hidden");
            document.getElementById("start-screen").classList.remove("transparent");
        }, 700);
    }
}

export default StartScreen;