window.onload = () => {
  let a = true
  let b = true
  let buttons = document.getElementsByTagName('button')
  let carousel = document.getElementsByTagName('image-carousel')[0]
  let timelineElement = document.getElementById('timeline')
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i]
    let pattern = button.getAttribute('class').split(' ')[0]
    console.log(pattern)
    if (pattern === 'interval') {
      if (a) {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, parseInt(carousel.getAttribute(pattern)) + 200)
          timelineElement.appendChild(createElement('interval+'))
        })
        a = false
      } else {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, parseInt(carousel.getAttribute(pattern)) - 200)
          timelineElement.appendChild(createElement('interval-'))
        })
      }
    } else if (pattern === 'display') {
      button.addEventListener('click', function (e) {
        carousel.setAttribute(pattern, buttons[i].getAttribute('content'))
        timelineElement.appendChild(createElement(buttons[i].getAttribute('content')))
      })
    } else if (pattern === 'blur') {
      if (b) {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, 'true')
          timelineElement.appendChild(createElement('Enable'))
        })
        b = false
      } else {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, 'false')
          timelineElement.appendChild(createElement('Disable'))
        })
      }
    }
  }
}

function createElement (name) {
  // maximum showing 5 button clicks
  let timelineElement = document.getElementById('timeline')
  if (timelineElement.children.length > 5) {
    timelineElement.children[1].remove()
  }
  // get position
  let item = document.getElementById('toChange')
  var position = (item.position === 'left') ? 'right' : 'left'
  item.position = position
  // get time and date
  var today = new Date()
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

  var timelineItem = document.createElement('timeline-item')
  timelineItem.setAttribute('content', 'button ' + name + ' is clicked')
  timelineItem.setAttribute('timestamp', date + ' ' + time)
  timelineItem.setAttribute('position', position)
  return timelineItem
}
