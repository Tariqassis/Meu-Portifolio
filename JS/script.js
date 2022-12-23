var header = document.getElementById("header")
var menubtn = document.getElementById("menubtn")

menubtn.onclick = function () {
    menubtn.classList.toggle('fa-xmark');
    header.classList.toggle('active');
    document.body.classList.toggle('active');
}


//fomulario

class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();








// CURSOR 


class RingDot {
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr")
        this.dot = document.querySelector(".curzr-dot")

        this.pointerX = 0
        this.pointerY = 0
        this.cursorSize = 21.6

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            display: 'flex',
            top: `${this.cursorSize / -2}px`,
            left: `${this.cursorSize / -2}px`,
            zIndex: '2147483647',
            justifyContent: 'center',
            alignItems: 'center',
            width: `${this.cursorSize}px`,
            height: `${this.cursorSize}px`,
            backgroundColor: '#fff0',
            boxShadow: '0 0 0 1.25px #111920, 0 0 0 2.25px #FFFFFF',
            borderRadius: '50%',
            transition: '200ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            zIndex: '2147483647',
            width: '4px',
            height: '4px',
            backgroundColor: '#111920',
            boxShadow: '0 0 0 1px #FFFFFF',
            borderRadius: '50%',
            userSelect: 'none',
            pointerEvents: 'none',
        }

        this.init(this.cursor, this.cursorStyle)
        this.init(this.dot, this.dotStyle)
    }

    init(el, style) {
        Object.assign(el.style, style)
        this.cursor.removeAttribute("hidden")

        document.body.style.cursor = 'none'
        document.body.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
            el.style.cursor = 'inherit'
        })
    }

    move(event) {
        if (event.target.localName === 'button' ||
            event.target.localName === 'a' ||
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
            this.hover(40)
        } else {
            this.hoverout()
        }

        this.pointerX = event.pageX + this.root.getBoundingClientRect().x
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y

        this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
    }

    hover(radius) {
        this.cursor.style.width = this.cursor.style.height = `${radius}px`
        this.cursor.style.top = this.cursor.style.left = `${radius / -2}px`
    }

    hoverout() {
        this.cursor.style.width = this.cursor.style.height = `${this.cursorSize}px`
        this.cursor.style.top = this.cursor.style.left = `${this.cursorSize / -2}px`
    }

    click() {
        this.cursor.style.transform += ` scale(0.75)`
        setTimeout(() => {
            this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '')
        }, 35)
    }

    remove() {
        this.cursor.remove()
        this.dot.remove()
    }
}

(() => {
    const cursor = new RingDot()
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.onmousemove = function (event) {
            cursor.move(event)
        }
        document.onclick = function () {
            cursor.click()
        }
    } else {
        cursor.remove()
    }
})()