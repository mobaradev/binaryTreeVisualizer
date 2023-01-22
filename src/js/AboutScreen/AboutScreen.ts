import Main from "../Main.js";

class AboutScreen {
    constructor() {
        document.getElementById("about-screen-x-button").addEventListener("click", () => this.hide());
    }

    show() {
        console.log('show')
        this.hide();
    }

    hide() {
        let box = document.getElementById("about-screen");
        if (box.classList.contains('hidden')) {
            box.classList.remove('hidden');
            setTimeout(function () {
                box.classList.remove('transparent');
            }, 20);
        } else {
            box.classList.add('transparent');
            setTimeout(() => {
                box.classList.add('hidden');
            }, 500)
        }
    }
}

export default AboutScreen;