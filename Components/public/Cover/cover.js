import 'TweenMax.min.js'
document.write("<script src='TweenMax.min.js' type='text/javascript'></script>")

/**
 * Used for creating stickers under cover component. When user clicks on
 * 'enter' button, The stickers will slide up alone with the cover component.
 * The class has a rotate field in style to create an overlay effect.
 * @class
 */
class Revealer {
  /**
   * Fires when an instance of revealer is created. The Revealer rotates in
   * different angles to create an overlay effect.
   * @constructor
   * @param {object} element - The element to be wrapped
   * @param {object} options - Structure that wraps field of Revealer(ex.angle)
   */
  constructor (element, options) {
    this.options = { angle: 0 }
    Object.assign(this.options, options)

    this.DOM = {}
    this.DOM.element = element
    this.DOM.inner = this.DOM.element.firstElementChild

    this.DOM.inner.style.width = `calc(100vw * ${Math.abs(Math.cos(this.options.angle * Math.PI / 180))} + 100vh * ${Math.abs(Math.sin(this.options.angle * Math.PI / 180))})`
    this.DOM.inner.style.height = `calc(100vw * ${Math.abs(Math.sin(this.options.angle * Math.PI / 180))} + 100vh * ${Math.abs(Math.cos(this.options.angle * Math.PI / 180))})`
    this.DOM.element.style.transform = `rotate3d(0,0,1,${this.options.angle}deg)`
  }
}

/*
 * Color array that changes the color of Revealer
 */
const overlayColors = ['#0E0E0E', '#CAA02F', '#BB3C3C', '#694d9f']

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

/**
 * Creates a Cover custom Web Component. Capable of covering the website
 * when user first visit it. User can click on 'start' which creates an
 * animation that all covers slide up
 * @class
 * @property {number} number - Number of stickers to make under cover
 * @property {number} angle - The angle that every sticker rotates
 * @property {string} title - Title for the cover
 * @property {string} img - Image path that shows for the cover
 * @property {string} bgcolor - The background color of cover
 *
 * @example
 * <cover-reveal number=4 angle=3 title="Team 8 Demo" img="img/ID8TIONLogo.png" bgColor="#000000"></cover-reveal>
 */
class Cover extends HTMLElement {
  /*
   * Returns the attributes of the cover. These can be set to change
   * the cover behavior. Changes to these attributes will have side
   * effects handled by attributeChangedCallback
   * @function
   * @returns {string[]}
   */
  static get observedAttributes () {
    return ['number', 'angle', 'title', 'img', 'bgColor']
  }

  /*
   * Returns the number of Revealer
   * @function
   * @returns {number} - the number of revealer
   */
  get number () {
    return this.getAttribute('number')
  }

  /*
   * Sets the number of Revealer shown
   * @function
   * @param {number} num - the number of revealer you wanna set
   */
  set number (num) {
    if (num >= 1) {
      this.setAttribute('number', num)
    }
  }

  /*
   * Gets the value of angle we want to set for revealer
   * @function
   * @returns {number} - value of angle
   */
  get angle () {
    return this.getAttribute('angle')
  }

  /*
   * Sets the number of angle of Revealer
   * @function
   * @param {number} - value of new angle
   */
  set angle (val) {
    if (val >= 0 && val <= 90) {
      this.setAttribute('angle', val)
    }
  }

  /*
   * Get the name of title shown
   * @function
   * @returns {string} - name of title
   */
  get title () {
    return this.getAttribute('title')
  }

  /*
   * Sets the title of the cover
   * @function
   * @param {string} - name of new color
   */
  set title (name) {
    this.setAttribute('title', name)
  }

  /*
   * Get the image path of cover
   * @function
   * @returns {string} - the image path
   */
  get img () {
    return this.getAttribute('img')
  }

  /*
   * Sets the image paht for the color
   * @function
   * @param {string} - new image path for the cover
   */
  set img (path) {
    this.setAttribute('img', path)
  }

  /*
   * Get the color value of background color
   * @function
   * @returns {number} - the value of color
   */
  get bgColor () {
    return this.getAttribute('bgColor')
  }

  /*
   * Sets the color of background
   * @function
   * @param {number} - color value of new background color
   */
  set bgColor (color) {
    this.setAttribute('bgColor', color)
  }

  /**
   * Fires when an instance of cover is created. It contains the basic element
   * inside cover custom element. For example: the title text, the enter button,
   * and the background image.
   * @constructor
   */
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

  /*
   * Method that creates stickers behind cover that slide up when user clicks
   * the enter button.
   * @function
   */
  createOverlays () {
    this.overlays = []
    for (var i = 0; i < this.getAttribute('number'); ++i) {
      var div = document.createElement('div')
      div.setAttribute('class', 'overlay')
      div.style = ' z-index: ' + (this.getAttribute('number') - i)
      var child = document.createElement('div')
      child.setAttribute('class', 'overlay__inner')
      child.style = 'background-color: ' + overlayColors[i]
      div.appendChild(child)
      this.overlays.push(new Revealer(div, { angle: i % 2 === 0 ? -this.getAttribute('angle') : this.getAttribute('angle') }))
    }
  }

  /*
   * Method that insert the revealer created under cover
   * @function
   */
  insertOverlays () {
    for (var i = 0; i < this.getAttribute('number'); ++i) {
      this.cover.parentNode.insertBefore(this.overlays[i].DOM.element, this.cover)
    }
  }

  /*
   * Does setup for component after it's added to the DOM by applying background
   * picture, background color, title, and enter button.
   * @callback
   */
  connectedCallback () {
    // Initialize the cover image
    this.intro_image.style = 'background-image: url(' + this.getAttribute('img') + ')'

    // Initialize the cover title
    this.intro_title.innerHTML = this.getAttribute('title')

    // Initialize the cover background color
    this.intro_block.setAttribute('style', 'background-color: ' + this.getAttribute('bgColor'))

    // Initalize and connect all the overlays
    this.createOverlays()
    this.insertOverlays()

    // Set correct z-index of the cover
    this.cover.style = 'position: absolute; z-index: ' + (parseInt(this.getAttribute('number')) + 1)

    // Await window to load so that innerHTML can be rendered.
    window.onload = () => {
      // bind the click function to the cover's button
      this.intro_enter.addEventListener('click', (function (overlays, cover, img) {
        return function (e) {
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
      })(this.overlays, this.cover, this.intro_image), false)
    }
  }
}

window.customElements.define('cover-reveal', Cover)
