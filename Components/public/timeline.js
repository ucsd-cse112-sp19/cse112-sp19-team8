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

/*
 * Timeline Class 
 * @property reverse - set if timeline should show in reverse order.
 */
class Timeline extends HTMLElement {
  // TODO 
  get reverse () {
    return this.hasAttribute('reverse')
  }

  // TODO - reverses order of the elements.
  set reverse (val) {
    console.log('inside set reverse.')
    if (val) {
      this.setAttribute('reverse', '')
    } else {
      this.removeAttribute('reverse')
    }
  }

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

