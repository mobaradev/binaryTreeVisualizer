import Main from "../Main.js";

class CanvasManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        console.log("CanvasManager()");
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        document.getElementById('canvas').classList.remove("canvas-animation-out");
        document.getElementById('canvas').classList.add("canvas-animation-in");
        setTimeout(() => {
            document.getElementById('canvas').classList.remove("canvas-animation-in");
            document.getElementById('canvas').classList.add("canvas-animation-out");
        }, 300);
    }
}

export default CanvasManager;