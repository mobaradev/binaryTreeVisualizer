import Main from "../Main.js";

class CanvasManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        console.log("CanvasManager()");
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth - 240;
        this.canvas.height = window.innerHeight;
    }

}

export default CanvasManager;