const timelineItemTemplate = document.createElement('template')
timelineItemTemplate.innerHTML = `
  <style>
    /* Container around content */
    .item {
        padding: 10px 40px;
        position: relative;
        background-color: inherit;
        width: 80%;
    }
    
    /* The circles on the timeline */
    .item::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        right: -17px;
        background-color: grey;
        border: 4px solid #FF9F55;
        top: 15px;
        border-radius: 50%;
        z-index: 1;
    }
    
    /* Place the container to the left */
    .left {
        left: 0;
    }
    
    /* Place the container to the right */
    .right {
        left: 50%;
    }
    
    /* Add arrows to the left container (pointing right) */
    .left::before {
        content: " ";
        height: 0;
        position: absolute;
        top: 22px;
        width: 0;
        z-index: 1;
        right: 30px;
        border: medium solid white;
        border-width: 10px 0 10px 10px;
        border-color: transparent transparent transparent white;
    }
    
    /* Add arrows to the right container (pointing left) */
    .right::before {
        content: " ";
        height: 0;
        position: absolute;
        top: 22px;
        width: 0;
        z-index: 1;
        left: 30px;
        border: medium solid white;
        border-width: 10px 10px 10px 0;
        border-color: transparent white transparent transparent;
    }
    
    /* Fix the circle for containers on the right side */
    .right::after {
        left: -16px;
    }
    
    /* The actual content */
    .main {
        padding: 20px 30px;
        position: relative;
        border-radius: 6px;
    }
  </style>

  <div class="item">
    <div class="main">
        <h2 class="timestamp"></h2>
        <p class="content"></p>
    </div>
   </div>
  `

/*
 * Timeline Class 
 * @property {String} timestamp - time for item component
 * @property {String} color - the color of the node for this timeline item.
 * @property {String} position - whether on "left" or "right"
 * @property {String} size - size of the node for the timeline item. "small" "medium" "large"
 * @property {String} content - content for the timeline item.
 */
class TimelineItem extends HTMLElement {

  get timestamp () {
    return this.getAttribute('timestamp')
  }

  set timestamp (time) {
    console.log('inside set timestamp')
    if (time) {
      this.setAttribute('timestamp', time)
    } else {
      this.removeAttribute('timestamp')
    }
    this.loadContent()
  }

  get content () {
    return this.getAttribute('content')
  }

  set content (txt) {
    console.log('inside set content')
    if (txt) {
      this.setAttribute('content', txt)
    } else {
      this.removeAttribute('content')
    }
    this.loadContent()
  }

  get color () {
    return this.getAttribute('color')
  }

  set color (col) {
    console.log('inside set color')
    if (col) {
      this.setAttribute('color', col)
    } else {
      this.removeAttribute('color')
    }
    this.loadContent()
  }

  get position () {
    return this.getAttribute('position')
  }

  set position (dir) {
    console.log('inside set position')
    if (dir) {
      this.setAttribute('position', dir)
    } else {
      this.removeAttribute('position')
    }
    this.loadContent()
  }

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(timelineItemTemplate.content.cloneNode(true))
    
    this.item = this.shadowRoot.querySelector('.item')
    this.timestampElem = this.item.querySelector('.timestamp')
    this.mainContent = this.item.querySelector('.content')

  };

  connectedCallback() {
    console.log("inside callback")
    this.loadContent();
  }

  loadContent () {
    this.mainContent.textContent = this.content;
    console.log(this.content);
    this.timestampElem.textContent = (this.timestamp) ? this.timestamp : '';
    console.log('Loading |' + this.mainContent.textContent + '| content | ' + this.timestamp + ' | timestamp |.')
  }
}

window.customElements.define('timeline-item', TimelineItem)
