const template = document.createElement('template')
template.innerHTML = `
  <style>
  </style>
  
  <div class = "core">
    <p class="content"></p>
    <p class="timestamp"></p>
    <div class="circle"></div>
  </div>
  `
/**
 * Creates a Timeline custom Web Element, that displays a timeline object with timeline items.
 * @class
 * @property {bool}      - 'ascending' - Whether timeline is ascending or descending.
 * @property {string}    - 'color' - changes color of timeline bubbles.
 */
class TimelineItem extends HTMLElement {

  /**
  * Returns whether this instance has 'rainbow' attribute.
  * @function
  * @returns {bool}
 */
  get timestamp () {
    return this.getAttribute('timestamp')
  }

  /**
   * Sets this instance's rainbow attribute.
   * @function
   * @param {bool}  - true for make rainbow, false for static color.
  */
  set timestamp (val) {
    if (val) {
      this.setAttribute('timestamp', val)
    } else {
      this.removeAttribute('timestamp')
    }
  }

  /**
  * Fires when an instance of the element is created.
  * @constructor
  */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.timestamp = this.shadowRoot.querySelector('.timestamp');
    this.content = this.shadowRoot.querySelector('.content');

    // Await window to load so that innerHTML can be rendered and then update user's choice 
    // of color and order.
    window.onload = () => {
      console.log("hello");
      this.content.innerHTML = this.innerHTML;
      this.timestamp.innerHTML = this.timestamp
    }
  };

  connectedCallback () {
    // 
    console.log("hello");
  }

  updateColor () {
    // Update timeline bubble color.

  }

  updateOrder () {
    // Update timeline order - ascending/descending.

  }
}

window.customElements.define('timeline-item', TimelineItem)
