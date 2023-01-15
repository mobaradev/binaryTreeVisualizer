class Cursor {
    x: number;
    y: number;
    scroll: number;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.scroll = 0;
    }
}

class Keyboard {
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
    z: boolean;
    x: boolean;

    constructor() {
        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.z = false;
        this.x = false;
    }
}

class InputManager {
    static keyboard: Keyboard;
    static cursor: Cursor;
    static init() {
        console.log("InputManager");

        setInterval(() => {
            InputManager.update();
        }, 10);

        InputManager.keyboard = new Keyboard();
        InputManager.cursor = new Cursor();

        window.addEventListener('mousemove', (event) => {
            InputManager.cursor.x = event.clientX;
            InputManager.cursor.y = event.clientY;
        });

        window.addEventListener('keydown', (event) => {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            const code = event.code;

            if (code === "KeyW") {
                InputManager.keyboard.w = true;
            } else if (code === "KeyA") {
                InputManager.keyboard.a = true;
            } else if (code === "KeyS") {
                InputManager.keyboard.s = true;
            } else if (code === "KeyD") {
                InputManager.keyboard.d = true;
            } else if (code === "KeyZ") {
                InputManager.keyboard.z = true;
            } else if (code === "KeyX") {
                InputManager.keyboard.x = true;
            }
        });

        window.addEventListener('keyup', (event) => {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            const code = event.code;

            if (code === "KeyW") {
                InputManager.keyboard.w = false;
            } else if (code === "KeyA") {
                InputManager.keyboard.a = false;
            } else if (code === "KeyS") {
                InputManager.keyboard.s = false;
            } else if (code === "KeyD") {
                InputManager.keyboard.d = false;
            } else if (code === "KeyZ") {
                InputManager.keyboard.z = false;
            } else if (code === "KeyX") {
                InputManager.keyboard.x = false;
            }
        });

        window.addEventListener("wheel", (event) => {
            console.log("wheel - " + event.deltaY);
            InputManager.cursor.scroll = event.deltaY;
        });
    }

    static update() {
        InputManager.cursor.scroll = 0;
    }
}

export default InputManager;