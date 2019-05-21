window.onload = () => {
  let a = true
  let b = true
  let buttons = document.getElementsByTagName('ripple-button')
  let carousel = document.getElementsByTagName('image-carousel')[0]
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i].shadowRoot.querySelector('button')
    let pattern = button.getAttribute('class').split(" ")[0]
    console.log(pattern);
    if (pattern === 'interval') {
      if (a) {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, parseInt(carousel.getAttribute(pattern)) + 200)
        })
        a = false
      } else {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, parseInt(carousel.getAttribute(pattern)) - 200)
        })
      }
    } else if (pattern === 'display') {
      button.addEventListener('click', function (e) {
        carousel.setAttribute(pattern, buttons[i].getAttribute('content'))
      })
    } else if (pattern === 'blur') {
      if (b) {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, 'true')
        })
        b = false
      } else {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, 'false')
        })
      }
    }
  }
}
