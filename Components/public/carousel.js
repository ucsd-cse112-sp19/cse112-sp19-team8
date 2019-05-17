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

class Carousel extends HTMLElement {
  get number () {
    return this.getAttribute('number')
  }

  get interval () {
    if (this.hasAttribute('interval')) {
      if (this.getAttribute('interval') === '') { return 2000 } else { return this.getAttribute('interval') }
    } else { return 2000 }
  }

  set interval (intv) {
    console.log('inside set interval.')
    if (intv) {
      this.setAttribute('interval', intv)
    } else {
      this.removeAttribute('interval')
    }
    setInterval(() => {
      this.switch()
    }, this.interval)
  }

  get imageFolder () {
    return this.getAttribute('imageFolder')
  }

  set imageFolder (path) {
    console.log('inside set imageFolder.')
    if (path) {
      this.setAttribute('imageFolder', path)
    } else {
      this.removeAttribute('imageFolder')
    }
    this.loadPics()
  }

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(carouselTemplate.content.cloneNode(true))

    this.i = 1
    this.table = this.shadowRoot.querySelector('.carousel')
    this.left_img = this.table.querySelector('#pic_left')
    this.center_img = this.table.querySelector('#pic_show')
    this.right_img = this.table.querySelector('#pic_right')
    // Await window to load so that innerHTML can be rendered.
    window.onload = () => {
      this.loadPics()
    }
  };

  connectedCallback () {
    this.loadPics()
    // Call the draw function initially
    this.switch()

    // Call the draw function every section to update the time
    setInterval(() => {
      this.switch()
    }, this.interval)
  }

  bound (val) {
    if (val < 0) { return this.number - 1 }
    if (val >= this.number) { return 0 }
    return val
  }

  switch () {
    this.left_img.src = this.image_array[this.bound(this.i - 1)]
    this.center_img.src = this.image_array[this.bound(this.i)]
    this.right_img.src = this.image_array[this.bound(this.i + 1)]
    this.i = this.bound(this.i + 1)
  };

  showLeft () {
    this.i = this.bound(this.i - 2)
    this.switch()
  }

  showRight () {
    this.switch()
  }

  loadPics () {
    console.log('Loading |' + this.number + '| Images from folder | ' + this.imageFolder + ' |.')
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
