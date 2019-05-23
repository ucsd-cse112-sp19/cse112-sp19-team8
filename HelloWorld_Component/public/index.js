window.onload = () => {
  let a = true
  let b = true
  let buttons = document.getElementsByTagName('ripple-button')
  let carousel = document.getElementsByTagName('image-carousel')[0]
  let timeline_element = document.getElementById('timeline')
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i].shadowRoot.querySelector('button')
    let pattern = button.getAttribute('class').split(' ')[0]
    console.log(pattern)
    if (pattern === 'interval') {
      if (a) {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, parseInt(carousel.getAttribute(pattern)) + 200)
          timeline_element.appendChild(createElement("interval+"))
        })
        a = false
      } else {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, parseInt(carousel.getAttribute(pattern)) - 200)
          timeline_element.appendChild(createElement("interval-"))
        })
      }
    } else if (pattern === 'display') {
      button.addEventListener('click', function (e) {
        carousel.setAttribute(pattern, buttons[i].getAttribute('content'))
        timeline_element.appendChild(createElement(buttons[i].getAttribute('content')))
      })
    } else if (pattern === 'blur') {
      if (b) {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, 'true')
          timeline_element.appendChild(createElement("Enable"))
        })
        b = false
      } else {
        button.addEventListener('click', function (e) {
          carousel.setAttribute(pattern, 'false')
          timeline_element.appendChild(createElement("Disable"))
        })
      }
    }
  }
}

function createElement(name){
  //maximum showing 5 button clicks
  let timeline_element = document.getElementById('timeline')
  if(timeline_element.children.length > 5) {
    timeline_element.children[1].remove()
  }
  //get position
  let item = document.getElementById('toChange');
  var position = (item.position === 'left') ? 'right' : 'left';
  item.position = position;
  //get time and date
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var timeline_item = document.createElement('timeline-item');
  timeline_item.setAttribute('content', 'button '+name+' is clicked');
  timeline_item.setAttribute('timestamp', date+' '+time);
  timeline_item.setAttribute('position', position);
  return timeline_item
}