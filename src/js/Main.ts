import Tree from "./Tree/Tree.js";
import CanvasManager from "./CanvasManager/CanvasManager.js";
import Visualizer from "./Visualizer/Visualizer.js";
import InputManager from "./InputManager/InputManager.js";
import PanelManager from "./PanelManager/PanelManager.js";

class Main {
    static canvasManager: CanvasManager;
    static tree: Tree;
    static visualizer: Visualizer;
    static panelManager: PanelManager;

    static init() {
        console.log("Main() init")
        Main.canvasManager = new CanvasManager();
        Main.tree = new Tree();
        Main.visualizer = new Visualizer(Main.canvasManager, Main.tree);
        Main.panelManager = new PanelManager();

        InputManager.init();

        Main.tree.init();

    }
}

Main.init();

export default Main;