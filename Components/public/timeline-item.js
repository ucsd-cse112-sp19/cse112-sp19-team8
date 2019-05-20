const timelineItemTemplate = document.createElement('template')
timelineItemTemplate.innerHTML = `
  <style>
    /* Container around content */
    .item {
        position: relative;
        width: 50%;
    }
    
    /* The circles on the timeline */
    .item::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        right: -19px;
        background-color: grey;
        border: 4px solid grey;
        top: 30px;
        border-radius: 50%;
        z-index: 1;
    }
    
    /* Place the container to the left */
    .left {
        text-align: right;
        left: 0;
    }
    
    /* Place the container to the right */
    .right {
        text-align: left;
        left: 50%;
    }
    
    /* Fix the circle for containers on the right side */
    .right::after {
        left: -14px;
    }
    
    /* The actual content */
    .main {
        padding: 10px 50px;
        position: relative;
        border-radius: 6px;
    }
  </style>

  <div class="item">
    <div class="main">
        <p class="content"></p>
        <b><p class="timestamp"></p></b>
    </div>
   </div>
  `

/*
 * Timeline Class 
 * @property {String} timestamp - time for item component
 * @property {String} color - TODO the color of the node for this timeline item.
 * @property {String} position - whether on "left" or "right"
 * @property {String} size - TODO size of the node for the timeline item. "small" "medium" "large"
 * @property {String} content - content for the timeline item.
 */
class TimelineItem extends HTMLElement {

  get timestamp () {
    return this.getAttribute('timestamp')
  }

  // Sets item's timestamp and updates with loadContent.
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

  // Sets timeline's description and reloads content.
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

  // Returns the color of the node on the timeline for this element and updates.
  set color (col) {
    console.log('inside set color')
    if (col) {
      this.setAttribute('color', col)
    } else {
      this.removeAttribute('color')
    }
    this.updateColor()
  }

  get position () {
    return this.getAttribute('position')
  }

  // Sets position of timeline element to either left or right.
  set position (dir) {
    console.log('inside set position')
    if (dir) {
      this.setAttribute('position', dir)
      this.updatePosition();
    } else {
      // left by default.
      this.setAttribute('position', 'left')
    }
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
    this.updatePosition();
  }

  // Updates whether timeline element is on the left or right of the bar.
  updatePosition() {
      console.log("inside position " + this.position);

      // update whether timeline item is on left or right on attribute change.
      if(this.position === 'left') {
        this.item.classList.remove(['right']);
        this.item.classList.add(['left']);
      } else if (this.position === 'right') {
        this.item.classList.remove(['left']);
        this.item.classList.add(['right']);
      } else {
        // Left is default.
        this.item.classList.remove(['right']);
        this.item.classList.add(['left']);
      }
      console.log('after ' + this.item.classList)
  }

  updateColor() {
      //TODO change ::after's selector for color of node.
  }

  // Loads timestamp and description into element.
  loadContent () {
    this.mainContent.textContent = this.content;
    console.log(this.content);
    this.timestampElem.textContent = (this.timestamp) ? this.timestamp : '';
    console.log('Loading |' + this.mainContent.textContent + '| content | ' + this.timestamp + ' | timestamp |.')
  }
}

window.customElements.define('timeline-item', TimelineItem)
