window.onload = () => {
  let button = document.getElementsByTagName('ripple-button')[0]
  let timelineElement = document.getElementById('timeline')

  let namesArr = ['Joel Loo', 'Charlotte Forgey-Jahn', 'Sarah Gemperle', 'Vincent Cannala',
    'Joshua Quan', 'Colin Van Winkle', 'Kuo', 'Muzhou Li', 'Tommy',
    'Yifan (Alex) Li', 'Zijin']
  let contentArr = ["My name is Joel Loo. I am a 4th year Cognitive Science major/Computer Science minor, interested in UX/UI design. I am our team's lead this quarter, and I hope that through fostering collaborative problem solving and interpersonal connections, our team will strive to succeed in our work. In my free time I enjoy going to music festivals and practicing graphic design!",
    "Hi I'm Charlotte and I'm a fourth year math-computer science major. In my spare time I like running, being at the beach, and browsing Reddit.",
    "I'm a tools and utility team member, and a current 4th year studying Mathematics-Computer Science with a Business minor! Love learning new web-dev and application development technologies. I enjoy hanging out with friends, music, and travel!",
    "Hi I'm Vincent. I like javascript and node! I code with atom, and I'm a techsavy nerd.",
    "I'm Joshua Quan, I'm one of the coders for the group. I'm a 3rd-year Computer Science major/Cognitive Science minor. I like to make small games in Unity and draw in my spare time!",
    'My name is Colin and I’m a 4th year CS major on the Tool & Utility team. As of lately I’ve taken an interest in web development. In my spare time I like to make music and play spikeball at the beach. :)',
    "I'm Kuo Liang, a 4th-year computer science student on the coder team. I like sleeping in my spare time",
    'I am Muzhou(Jim). I’m the co-lead of the team. I major in CE, and I’m interested in machine learning, the biggest fad in the industry over the past few years.',
    'I am Hanqing Zhang, a coder of the team. A fourth-year undergraduate majoring in CS. Nothing special, nothing new.',
    "My name is Yifan(Alex) on the DevOps team. I'm a fourth year CS major/math minor. I enjoy snowboarding during winter time.",
    'I’m Zijin Fu, a 4th year computer science student on the quality assurance team. I’m interested in full-stack development. Love speeding and gaming in my spare time.']

  let position = 'left' // false for left first.
  button.addEventListener('click', function (e) {
    console.log('in append')
    if (contentArr.length === 0) {
      window.alert("That's all folks!")
    } else {
      timelineElement.appendChild(createElement(namesArr[0], contentArr[0], position))
      position = (position === 'left') ? 'right' : 'left'
    }
    namesArr.shift()
    contentArr.shift()
  })

  function createElement (name, content, position) {
    console.log('in create')
    var timelineItem = document.createElement('timeline-item')
    timelineItem.setAttribute('content', content)
    timelineItem.setAttribute('timestamp', name)
    timelineItem.setAttribute('position', position)
    return timelineItem
  }

  /*
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i].shadowRoot.querySelector('button')
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
*/

/*
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
} */
}
