const template = document.createElement('template')
template.innerHTML = `
  <style>
    body {
        background-color: #333;
    }
    
    button {
        
        font-size: 24px;
        padding: 1em 2em;
        margin: 3px;
        border: 0;
        outline: 0;
        color: white;
        background-color: #2196F3;
        text-transform: uppercase;
        border-radius: 0.15em;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    
        overflow: hidden;
        position: relative;
    }
    
    button .ripple {
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        position: absolute;
        transform: scale(0);
        animation: ripple 0.6s linear;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
  </style>
  <button id="btn">default</button>
  `
/**
 * Creates a CoreHello custom Web Element, that displays "Hello World".
 * @class
 * @property {bool}    - 'rainbow' - Whether text changes colors on an interval
 * @property {string}    - 'lang' - to display HelloWorld text in.
 */
class RippleButton extends HTMLElement {
    /**
     * Returns whether this instance has 'content' attribute.
     * @function
     * @returns {bool}
     */
    get content () {
        return this.hasAttribute('content')
    }

    /**
     * Sets this instance's content attribute.
     * @function
     * @param {bool}  - true for make content, false for static color.
     */
    set content (val) {
        console.log('inside set content' + val)
        if (val) {
            this.setAttribute('content', val)
        } else {
            this.removeAttribute('content')
        }
        this.updateContent()
    }

    /**
     * Fires when an instance of the element is created.
     * @constructor
     */
    constructor () {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.Buttons = this.shadowRoot.getElementById('btn')
    };

    connectedCallback () {
        this.Buttons.addEventListener('click', this.createRipple)
        this.updateContent()
    }
    createRipple (e) {
        var circle = document.createElement('div');
        this.appendChild(circle);

        var d = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = d + 'px';

        var rect = this.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left -d/2 + 'px';
        circle.style.top = e.clientY - rect.top - d/2 + 'px';
        circle.classList.add('ripple');
    }

    updateContent() {
        console.log(this.getAttribute('content'))
        this.Buttons.innerText = this.getAttribute('content')
    }
}

window.customElements.define('ripple-button', RippleButton)
