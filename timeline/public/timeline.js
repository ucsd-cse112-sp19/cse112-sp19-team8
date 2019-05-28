const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>
  
  <div class = "core">
    <h1>Timeline</h1>
  </div>
  `
/**
 * Creates a Timeline custom Web Element, that displays a timeline object with timeline items.
 * @class
 * @property {bool}    - 'ascending' - Whether timeline is ascending or descending.
 * @property {string}    - 'color' - changes color of timeline bubbles.
 */
class Timeline extends HTMLElement {
  /**
  * Returns whether this instance has 'rainbow' attribute.
  * @function
  * @returns {bool}
 */
  get ascending () {
    return this.hasAttribute('ascending')
  }

  /**
   * Sets this instance's rainbow attribute.
   * @function
   * @param {bool}  - true for make rainbow, false for static color.
  */
  set ascending (val) {
    if (val) {
      this.setAttribute('ascending', '')
    } else {
      this.removeAttribute('ascending')
    }
  }

  /**
   * Returns this instance's 'lang' attribute.
   * @function
   * @returns {string}  - Shows current Core-Hello language.
  */
  get color () {
    return this.getAttribute('color')
  }

  /**
   * Sets this instance's lang attribute.
   * @function
   * @param {string}  - Retrieves the current Core-Hello language.
  */
  set color (col) {
    if (col) {
      this.setAttribute('color', col)
    } else {
      this.removeAttribute('color')
    }
    this.updateColor()
  }
  /**
  * Fires when an instance of the element is created.
  * @constructor
  */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.title = this.shadowRoot.getElementByTagName('h1');

    // Await window to load so that innerHTML can be rendered and then update user's choice 
    // of color and order.
    window.onload = () => {
      this.title = this.innerHTML;
      this.updateColor();
      this.updateOrder();
    }
  };

  connectedCallback () {
    // Set language of hello world.
    this.updateColor();
    updateOrder();
  }

  updateColor () {
    // Update timeline bubble color.
  }

  updateOrder () {
    // Update timeline bubble color.
  }
}

window.customElements.define('timeline', Timeline)
