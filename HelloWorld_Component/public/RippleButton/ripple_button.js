const buttonTemplate = document.createElement('template')
buttonTemplate.innerHTML = `
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
<style>
button {
  font-size: 1.3em;
  width: 10em;
  padding: 1em 2em;
  margin: 3px;
  border: 0;
  outline: 0;
  text-transform: uppercase;
  color: white;
  background-color: #2196F3;
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
<div class = "container">
</div>
`
/**
 * Creates a RippleButton custom Web Element, capable of creating multiple buttons of
 * varying sizes and texts.
 * @class
 * @property {string} content - The text displayed by the button.
 * @property {string} class - The class name of the button.
 */
class RippleButton extends HTMLElement {
  /**
   * Fires when an instance of the button is created.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true))
  }

  /**
   * Returns the content of the button.
   * @function
   * @returns {string} - The string to be displayed by the button.
   */
  get contents () {
    return this.getAttribute('content')
  }

  /**
   * Returns the class of the button.
   * @function
   * @returns {string} - A string indicating the class name.
   */
  get class () {
    if (this.hasAttribute('class')) { return this.getAttribute('class') } else { return 'default' }
  }

  connectedCallback () {
    this.update()
  }

  /**
   * Updates the button to have functionality and text.
   * @function
   */
  update () {
    var div = this.shadowRoot.querySelector('.container')

    // Creates the button element
    var button = document.createElement('button')

    // Adds button response functionality
    button.addEventListener('click', function (e) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[0].remove()
      }

      var circle = document.createElement('div')
      circle.classList.add('ripple')
      this.appendChild(circle)

      var d = Math.max(this.clientWidth, this.clientHeight)

      circle.style.width = circle.style.height = d + 'px'

      var rect = this.getBoundingClientRect()
      circle.style.left = e.clientX - rect.left - d / 2 + 'px'
      circle.style.top = e.clientY - rect.top - d / 2 + 'px'
    })

    // Sets attributes and contents of the button
    button.setAttribute('class', this.class)
    //button.setAttribute('type', 'button')
    //button.classList.add('btn')
    //button.classList.add('btn-primary')
    //button.classList.add('btn-lg')
    button.innerHTML = this.contents
    div.appendChild(button)
  }
}

window.customElements.define('ripple-button', RippleButton)