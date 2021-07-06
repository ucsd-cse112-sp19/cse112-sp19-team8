document.write("<script src='TweenMax.min.js' type='text/javascript'></script>");

// wrap the element
class Revealer {
  constructor(element, options) {
    this.options = { angle: 0 }
    Object.assign(this.options, options)

    this.DOM = {}
    this.DOM.element = element
    this.DOM.inner = this.DOM.element.firstElementChild;
            
    this.DOM.inner.style.width = `calc(100vw * ${Math.abs(Math.cos(this.options.angle * Math.PI/180))} + 100vh * ${Math.abs(Math.sin(this.options.angle * Math.PI/180))})`
    this.DOM.inner.style.height = `calc(100vw * ${Math.abs(Math.sin(this.options.angle * Math.PI/180))} + 100vh * ${Math.abs(Math.cos(this.options.angle * Math.PI/180))})`
    this.DOM.element.style.transform = `rotate3d(0,0,1,${this.options.angle}deg)`

  }
}
const overlay_colors = ["#0E0E0E", "#CAA02F", "#BB3C3C", "#694d9f"]

const coverTemplate = document.createElement('template')
coverTemplate.innerHTML = `
  
  <style>
  .intro {
    position: relative;
    display: grid;
    grid-template-rows: auto 40vh 20vh auto;
    grid-template-columns: 100%;
    align-items: center;
    justify-items: center;
    width: 100vw;
    height: 100vh;

  }
  .intro__img {
    background-position: 50% 0%;
    background-size: cover;
    width: 320px;
    height: 100%;
    max-height: 600px;
    grid-row: 2 / span 2;
    grid-column: 1;
    position: relative;
    will-change: transform;
  }
  .intro__title {
    position: relative;
    grid-row: 2 / span 2;
    grid-column: 1;
    font-family: tenez, sans-serif;
    font-weight: 700;
    font-size: 8vw;
    line-height: 1;
    margin: 0;
    color: #FFFFFF;
    cursor: default;
  }
  .intro__enter {
    position: relative;
    grid-row: 3;
    grid-column: 1;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    font-size: 2.9rem;
    will-change: transform;
  }
  .cover__hidden {
    pointer-events: none;
  }
  .content__move {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    align-items: center;
    grid-area: 1 / 1 / 2 / 2;
    justify-self: center;
    position: relative;
    will-change: transform;
    overflow: hidden;
    background: #0E0E0E;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .overlay__inner {
    position: relative;
    width: 200%;
    height: 200%;
    flex: none;
    will-change: transform;
  }
  </style>
  <div style="overflow:hidden; position: relative;">
    <div class="cover">
      <div class="content__move">
        <div class="intro">
          <div class="intro__img" style></div>
          <h2 class="intro__title"></h2>
          <button class="intro__enter" >enter</button>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
  `
class Cover extends HTMLElement {

  static get observedAttributes () {
    return ['number', 'angle', 'title', 'img', 'bgColor']
  }

  get number () {
    return this.getAttribute('number')
  }

  set number (num) {
    if (num >= 1) {
      this.setAttribute('number', num)
    }
  }

  get angle () {
    return this.getAttribute('angle')
  }

  set angle (val) {
    if (0 <= val && val <= 90) {
      this.setAttribute('angle', val)
    }
  }

  get title () {
    return this.getAttribute('title')
  }

  set title (name) {
    this.setAttribute('title', name)
  }

  get img () {
    return this.getAttribute('img')
  }

  set img (path) {
    this.setAttribute('img', path)
  }

  get bgColor () {
    return this.getAttribute('bgColor')
  }

  set bgColor (color) {
    this.setAttribute('bgColor', color)
  }

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(coverTemplate.content.cloneNode(true))

    this.cover = this.shadowRoot.querySelector('.cover')
    this.intro_block = this.shadowRoot.querySelector('.intro')
    this.intro_image = this.intro_block.querySelector('.intro__img')
    this.intro_title = this.intro_block.querySelector('.intro__title')
    this.intro_enter = this.intro_block.querySelector('.intro__enter')

  };

  createOverlays() {
    this.overlays = [];
    for (var i = 0; i < this.getAttribute('number'); ++i) {
      var div = document.createElement('div')
      div.setAttribute('class', "overlay")
      div.style = " z-index: " + (this.getAttribute('number') - i)
      var child = document.createElement('div')
      child.setAttribute('class', "overlay__inner")
      child.style = "background-color: " + overlay_colors[i]
      div.appendChild(child)
      this.overlays.push(new Revealer(div, {angle : i % 2 === 0 ? -this.getAttribute('angle') : this.getAttribute('angle')}))
    }
  }

  insertOverlays() {
    for (var i = 0; i < this.getAttribute('number'); ++i) {
      this.cover.parentNode.insertBefore(this.overlays[i].DOM.element, this.cover)
    }
  }

  connectedCallback () {
    // Initialize the cover image
    this.intro_image.style = "background-image: url(" + this.getAttribute('img') + ")"
    
    // Initialize the cover title
    this.intro_title.innerHTML = this.getAttribute('title')

    // Initialize the cover background color
    this.intro_block.setAttribute("style", "background-color: " + this.getAttribute('bgColor'))
    
    // Initalize and connect all the overlays
    this.createOverlays()
    this.insertOverlays()

    // Set correct z-index of the cover
    this.cover.style = "position: absolute; z-index: " + (parseInt(this.getAttribute('number')) + 1)

    // wrap the cover element
    var revealer = new Revealer(this.cover, {angle : 0})

    // Await window to load so that innerHTML can be rendered.
    window.onload = () => {

      // bind the click function to the cover's button
      this.intro_enter.addEventListener('click', (function(overlays, cover, img) {
        return function(e) {
          // set the cover inactive
          cover.classList.add('cover__hidden')

          const ease = Expo.easeInOut
          const duration = 1.2
        
          var pageToggleTimeline = new TimelineMax()

          // Move the cover away
          .to(cover, duration, {
            ease: ease,
            y: '-100%'
          }, 0)
          
          // Animate overlays
          var interval = 0
          for (var i = 0; i < overlays.length; ++i) {
            interval = 0.2 * (i + 1)
            pageToggleTimeline
            .to(overlays[i].DOM.inner, duration, {
              ease: ease,
              y: '-100%'
            }, interval)
          }
        }
      }) (this.overlays, this.cover, this.intro_image), false)

    }
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
  }

}

window.customElements.define('cover-reveal', Cover)
