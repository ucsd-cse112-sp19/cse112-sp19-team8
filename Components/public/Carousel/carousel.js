const carouselTemplate = document.createElement('template')
carouselTemplate.innerHTML = `
  <style>
    .blur {
      -webkit-filter: blur(10px);
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);    
      filter: blur(10px);
    }
  </style>
  <table class="carousel" border=0 cellpadding=0 cellspacing=0 align="center">
    <tr>
      <td>
        <div align="left" style="padding-left:20px">
          <img id="pic_left" src height="160px" class="blur"/>
        </div>
      </td>
      <td>
        <div style="position:relative;width:600px;height:320px;">
          <div align="center" style="position:relative;">
            <img id="pic_show" src height="320px"/>
          </div>
        </div>
      </td>
      <td>
        <div align="right" style="padding-right:20px">
          <img id="pic_right" src height="160px" class="blur"/>
        </div>
      </td>
    </tr>
  </table>
  `
/**
 * Creates a Carousel custom Web Element, capable of displaying multiple images.
 * One image is displayed in front at a time. Two images are displayed on each side.
 * @class
 * @property {number} number - Number of images.
 * @property {string} imagefolder - The directory to grab images from.
 * @property {number} interval - How frequently the front image is changed.
 * @property {string} display - Changes display order. Can be "normal", "reverse", or "random".
 * @property {bool} blur - Determines if images on the sides are blurred or not.
 *
 * @example
 *
 * <image-carousel number=8 imageFolder='img' interval=1500 display blur='false'> </image-carousel>
 *
 */
class Carousel extends HTMLElement {
  /*
   * Returns the attributes of the carousel. These can be set to change the carousel behavior.
   * Changes to these attributes will have side effects handled by
   * attributeChangedCallback
   * @function
   * @returns {string[]}
   */
  static get observedAttributes () {
    return ['number', 'imagefolder', 'interval', 'display', 'blur']
  }

  /*
  * Returns the number of images in the carousel.
  * @function
  * @returns {number} - Number of images displayed in the carousel.
  */
  get number () {
    return this.getAttribute('number')
  }

  /*
   * Sets the number of images in the carousel.
   * @function
   * @param {number} num - Number of images to display; must be 3 or greater.
   */
  set number (num) {
    if (num >= 3) {
      this.setAttribute('number', num)
    }
  }

  /*
   * Returns the image directory of the carousel.
   * @function
   * @returns {string} - The file path of the images folder.
   */
  get imageFolder () {
    return this.getAttribute('imagefolder')
  }

  /*
   * Sets the image directory of the carousel - where it will display images from.
   * @function
   * @param {string} path - The new file path of the images folder.
   */
  set imageFolder (path) {
    this.setAttribute('imagefolder', path)
  }

  /*
   * Gets the interval of the carousel - how quickly the front image is switched.
   * @function
   * @returns {number} - The delay between image switching.
   */
  get interval () {
    return this.getAttribute('interval')
  }

  /*
   * Sets how frequently the front image is switched.
   * @function
   * @param {number} intv - The new delay between image switching.
   */
  set interval (intv) {
    this.setAttribute('interval', intv)
  }

  /*
   * Gets the image display order.
   * @function
   * @returns {string} - The display mode of the carousel.
   */
  get display () {
    return this.getAttribute('display')
  }

  /*
   * Sets the image display order.
   * @function
   * @param {string} option - The display mode of the carousel. Valid modes:
   * "normal", "reverse", "random".
   */
  set display (option) {
    if (option === 'normal' || option === 'reverse' || option === 'random') {
      this.setAttribute('display', option)
    }
  }

  /*
   * Gets bool indicating if the carousel's side images are blurred or not
   * @function
   * @returns {bool} - Indicates if carousel's side images are blurred or not.
   */
  get blur () {
    return this.getAttribute('blur')
  }

  /*
   * Sets the blur for the carousel.
   * @function
   * @param {bool} option - True if the images on the side should blur, else false.
   */
  set blur (option) {
    if (option === 'true' || option === 'false') { this.setAttribute('blur', option) }
  }

  /**
   * Fires when an instance of the carousel is created. Obtains left, middle, 
   * and right images for display.
   * @constructor
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(carouselTemplate.content.cloneNode(true))

    this.i = 1
    this.connected = false
    this.table = this.shadowRoot.querySelector('.carousel')
    this.left_img = this.table.querySelector('#pic_left')
    this.center_img = this.table.querySelector('#pic_show')
    this.right_img = this.table.querySelector('#pic_right')
  };

  /*
   * Does setup for component after it's added to the DOM by applying blur, 
   * loading source images, displaying those images, and preparing the image
   * index for the next switch. Also applies a default interval of 2000 if none
   * is set.
   * @callback
   */
  connectedCallback () {
    this.connected = true

    // Apply initial blur (if applicable)
    if (this.getAttribute('blur') === 'true') this.applyBlur()
    else  this.removeBlur()

    // Default interval if none is given
    if (this.getAttribute('interval') === null) this.setAttribute('interval', 2000)

    // Load images from source
    this.loadPics()

    // Get first few images, prepare index for next switch
    this.switch()

    clearInterval(this.refreshID)
    this.refreshID = setInterval(() => {
      this.switch()
    }, this.getAttribute('interval'))
  }

  /*
   * Handles side-effects of attribute changes
   * @callback
   */
  attributeChangedCallback (attrName, oldVal, newVal) {
    if (this.connected === false) { return }
    console.log(`Update attribute |${attrName}|: ${oldVal} to ${newVal}`)
    switch (attrName) {
      case 'number':
        if (newVal >= 3) {
          this.loadPics()
          this.switch()
        }
        break
      case 'imagefolder':
        this.loadPics()
        this.switch()
        break
      case 'interval':
        // Apply default when empty input -> 2000
        if (newVal === '') this.setAttribute('newVal', 2000)
        clearInterval(this.refreshID)
        this.refreshID = setInterval(() => {
          this.switch()
        }, this.getAttribute('interval'))
        break
      case 'display':
        // Apply default when invalid input -> 'normal'
        if (newVal != 'normal' && newVal != 'reverse' && newVal != 'random') {
          this.setAttribute('display', 'normal')
        }
        break
      case 'blur':
        this.applyBlur() 
        break
    }
  }

  /*
   * Returns a value that is within image array boundaries.
   * @function
   * @param {number} val - The value to be transformed to array boundaries.
   */
  bound (val) {
    // If the value is negative, we will decrement.
    if (val < 0) { return this.number - 1 };

    // If the value is above the array boundary, return 0.
    if (val >= this.number) { return 0 };

    // Original value is within array bounds - return it.
    return val
  }

  /*
   * Gets the next image index depending on the display mode and the current
   * index. Anything other than reverse and random (including normal) defaults
   * to normal switching strategy
   * @function
   * @param {number} val - The current image index.
   */
  step (val) {
    if (this.getAttribute('display') === 'reverse') { 
      return val - 1 
    } else if (this.getAttribute('display') === 'random') {
      return Math.ceil(Math.random() * this.number) 
    } else { 
      return val + 1 
    }
  }

  /*
   * Switches the three images of the carousel as appropriate. Sets the next index.
   * @function
   */
  switch () {
    this.left_img.src = this.image_array[this.bound(this.i - 1)]
    this.center_img.src = this.image_array[this.bound(this.i)]
    this.right_img.src = this.image_array[this.bound(this.i + 1)]
    this.i = this.bound(this.step(this.i))
  };

  /*
   * Applies blur to the images by setting left and right
   * image attributes.
   * @function
   */
  applyBlur () {
    this.left_img.setAttribute('class', 'blur')
    this.right_img.setAttribute('class', 'blur')
  }

  /*
   * Removes blur from images by setting left and right
   * image attributes.
   * @function
   */
  removeBlur() {
    this.left_img.setAttribute('class', 'non_blur')
    this.right_img.setAttribute('class', 'non_blur')
  }

  /*
   * Moves the image on the left to the front.
   * @function
   */
  showLeft () {
    this.i = this.bound(this.i - 2)
    this.switch()
  }

  /*
   * Moves the image on the right to the front.
   * @function
   */
  showRight () {
    this.switch()
  }

  /*
   * Load images from the directory indicated by the "imagefolder" attribute.
   * @function
   */
  loadPics () {
    console.log('Loading |' + this.number + '| images from folder | ' + this.imageFolder + ' |.')
    this.image_array = new Array(this.number)
    for (var i = 0; i < this.number; i++) {
      var a = document.createElement('a')
      a.href = this.imageFolder + '/' + (i + 1) + '.jpg'
      this.image_array[i] = a
    }
    console.log('Loaded Successfully.')
  }
}

window.customElements.define('image-carousel', Carousel)
