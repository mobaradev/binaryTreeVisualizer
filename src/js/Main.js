import Tree from "./Tree/Tree.js";
import CanvasManager from "./CanvasManager/CanvasManager.js";
import Visualizer from "./Visualizer/Visualizer.js";
import InputManager from "./InputManager/InputManager.js";
import PanelManager from "./PanelManager/PanelManager.js";
import StartScreen from "./StartScreen/StartScreen.js";
import AboutScreen from "./AboutScreen/AboutScreen.js";
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.init = function () {
        console.log("Main() init");
        Main.appVersionNumber = "1.00";
        Main.canvasManager = new CanvasManager();
        Main.tree = new Tree();
        Main.visualizer = new Visualizer(Main.canvasManager, Main.tree);
        Main.panelManager = new PanelManager();
        Main.startScreen = new StartScreen();
        Main.aboutScreen = new AboutScreen();
        InputManager.init();
        Main.tree.init();
    };
    return Main;
}());
Main.init();
export default Main;
//# sourceMappingURL=Main.js.map