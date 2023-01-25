var CanvasManager = /** @class */ (function () {
    function CanvasManager() {
        console.log("CanvasManager()");
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    CanvasManager.prototype.animate = function () {
        document.getElementById('canvas').classList.remove("canvas-animation-out");
        document.getElementById('canvas').classList.add("canvas-animation-in");
        setTimeout(function () {
            document.getElementById('canvas').classList.remove("canvas-animation-in");
            document.getElementById('canvas').classList.add("canvas-animation-out");
        }, 300);
    };
    return CanvasManager;
}());
export default CanvasManager;
//# sourceMappingURL=CanvasManager.js.map