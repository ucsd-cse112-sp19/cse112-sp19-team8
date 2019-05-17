const buttonGroupTemplate = document.createElement('template')
buttonGroupTemplate.innerHTML = `
  <style>
    .ripple {
      position: relative;
      overflow: hidden;
    }

    .ripple:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition: transform .3s, opacity .5s;
    }
    .ripple:active:after {
      transform: scale(0, 0);
      opacity: .3;
      transition: 0s;
    }
  </style>

  <div class = "container text-center">
    
  </div>
  `

class RippleButtonGroup extends HTMLElement {
  get contents () {
    return this.getAttribute('contents')
  }

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(buttonGroupTemplate.content.cloneNode(true))
  }

  connectedCallback () {
    this.update()
  }

  update () {
    var div = this.shadowRoot.querySelector('.container')
    var array = this.contents.split(';')
    console.log(array)
    for (var i = 0; i < array.length; i++) {
      var button = document.createElement('button')
      button.setAttribute('class', 'btn btn-default ripple btn-lg')
      button.innerHTML = array[i]
      div.appendChild(button)
    }
  }
}

window.customElements.define('ripple-button-group', RippleButtonGroup)
