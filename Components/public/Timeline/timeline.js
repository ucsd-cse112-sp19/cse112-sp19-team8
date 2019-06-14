const timelineTemplate = document.createElement('template')
timelineTemplate.innerHTML = `
  <style>
    /* The actual timeline (the vertical ruler) */
    .main {
        position: relative;
        max-width: 100%;
        display: flex;
        font-family: ''
    }
    
    /* The actual timeline (the vertical ruler) */
    .main::after {
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
  <div class="main" style="flex-direction: column-reverse">
    <slot></slot>
  </div>
  `

/**
 * Creates a timeline element that arranges events in a column in sequential order
 * @class
 * @property {bool} reverse - Set if timeline should show in reverse order (top to bottom, bottom to top)
 */
class Timeline extends HTMLElement {
  static get observedAttributes () {
    return ['reverse']
  }

  /**
   * See if the elements in the timeline are reversed. (TODO)
   * @function
   * @returns {bool} - True if the order is reversed, else false.
   */
  get reverse () {
    return this.getAttribute('reverse')
  }

  /**
   * Set if the elements should be reversed.
   * @function
   * @param {bool} val - True if the order should be reversed, else false.
   */
  set reverse (val) {
    console.log('inside set reverse.')
    this.setAttribute('reverse', val)
  }

  /**
   * Fires when an instance of the timeline is created.
   * @constructor
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(timelineTemplate.content.cloneNode(true))

    this.main = this.shadowRoot.querySelector('.main')
  };

  connectedCallback () {
    this.reverseItems()
  }

  /*
   * Handles side-effects of attribute changes
   * @callback
   */
  attributeChangedCallback (attrName, oldVal, newVal) {
    console.log(`Update attribute |${attrName}|: ${oldVal} to ${newVal}`)
    switch (attrName) {
      case 'reverse':
        this.reverseItems()
        break
    }
  }

  /**
   * Flips the direction the flex items are arranged in the container.
   * See reference: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
   * @function
   */
  reverseItems () {
    console.log('reverse??? ' + this.getAttribute('reverse'))

    if (this.getAttribute('reverse') === 'true') {
      this.main.style.flexDirection = 'column-reverse'
    } else {
      this.main.style.flexDirection = 'column'
    }
  }
}

window.customElements.define('timeline-element', Timeline)
