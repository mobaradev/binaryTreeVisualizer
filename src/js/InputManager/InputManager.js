var Cursor = /** @class */ (function () {
    function Cursor() {
        this.x = 0;
        this.y = 0;
        this.scroll = 0;
        this.leftPress = false;
        this.leftPressX = 0;
        this.leftPressY = 0;
    }
    return Cursor;
}());
var Keyboard = /** @class */ (function () {
    function Keyboard() {
        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.z = false;
        this.x = false;
    }
    return Keyboard;
}());
var InputManager = /** @class */ (function () {
    function InputManager() {
    }
    InputManager.init = function () {
        var _this = this;
        console.log("InputManager");
        setInterval(function () {
            InputManager.update();
        }, 10);
        InputManager.keyboard = new Keyboard();
        InputManager.cursor = new Cursor();
        document.getElementById("canvas").addEventListener('mousemove', function (event) {
            InputManager.cursor.x = event.clientX;
            InputManager.cursor.y = event.clientY;
        });
        window.addEventListener('keydown', function (event) {
            var key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            var code = event.code;
            if (code === "KeyW") {
                InputManager.keyboard.w = true;
            }
            else if (code === "KeyA") {
                InputManager.keyboard.a = true;
            }
            else if (code === "KeyS") {
                InputManager.keyboard.s = true;
            }
            else if (code === "KeyD") {
                InputManager.keyboard.d = true;
            }
            else if (code === "KeyZ") {
                InputManager.keyboard.z = true;
            }
            else if (code === "KeyX") {
                InputManager.keyboard.x = true;
            }
        });
        window.addEventListener('keyup', function (event) {
            var key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            var code = event.code;
            if (code === "KeyW") {
                InputManager.keyboard.w = false;
            }
            else if (code === "KeyA") {
                InputManager.keyboard.a = false;
            }
            else if (code === "KeyS") {
                InputManager.keyboard.s = false;
            }
            else if (code === "KeyD") {
                InputManager.keyboard.d = false;
            }
            else if (code === "KeyZ") {
                InputManager.keyboard.z = false;
            }
            else if (code === "KeyX") {
                InputManager.keyboard.x = false;
            }
        });
        document.getElementById("canvas").addEventListener("wheel", function (event) {
            console.log("wheel - " + event.deltaY);
            InputManager.cursor.scroll = event.deltaY;
        });
        document.getElementById("canvas").addEventListener("mousedown", function (event) {
            _this.cursor.leftPress = true;
            _this.cursor.leftPressX = event.clientX;
            _this.cursor.leftPressY = event.clientY;
        });
        document.getElementById("canvas").addEventListener("mouseup", function (event) {
            _this.cursor.leftPress = false;
        });
    };
    InputManager.update = function () {
        InputManager.cursor.scroll = 0;
    };
    return InputManager;
}());
export default InputManager;
//# sourceMappingURL=InputManager.js.map