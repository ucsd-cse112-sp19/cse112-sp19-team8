const timelineTemplate = document.createElement('template')
timelineTemplate.innerHTML = `
  <style>
    /* The actual timeline (the vertical ruler) */
    :host {
        position: relative;
        max-width: 100%;
        display: block;
        font-family: ''
    }
    
    /* The actual timeline (the vertical ruler) */
    :host::after {
        content: '';
        position: absolute;
        width: 6px;
        background-color: grey;
        top: 0;
        bottom: 0;
        left: 50%;
    } 
    ::slotted {
        display: block;
    }
  </style>
  <slot></slot>
  `

/**
 * Timeline class
 * @class
 * @property {bool} reverse - Set if timeline should show in reverse order.
 */
class Timeline extends HTMLElement {
  
  /**
   * See if the elements in the timeline are reversed. (TODO)
   * @function
   * @returns {bool} - True if the order is reversed, else false.
   */
  get reverse () {
    return this.hasAttribute('reverse')
  }

  /**
   * Set if the elements should be reversed. (TODO)
   * @function
   * @param {bool} val - True if the order should be reversed, else false.
   */
  set reverse (val) {
    console.log('inside set reverse.')
    if (val) {
      this.setAttribute('reverse', '')
    } else {
      this.removeAttribute('reverse')
    }
  }

  /**
   * Fires when an instance of the timeline is created.
   * @constructor
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(timelineTemplate.content.cloneNode(true))
  };

  // TODO
  reverseItems() {

  }
    
}

window.customElements.define('timeline-element', Timeline)

