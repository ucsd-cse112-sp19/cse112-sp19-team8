describe('Testing component Carousel', () => {
  var component

  beforeEach(function () {
    component = new Carousel()
  })
  
  describe('Test Attribute Display', () => {
    it('should set display to reverse', () => {
      component.display = 'reverse'
      expect(component.hasAttribute('display', 'reverse')).equal(true)
    })

    it('should set display to normal with wrong input', () => {
      // Set an inital attribute
      component.setAttribute('display', 'normal')
      // Change the property to an invalid output,
      // should not change the attribute value
      component.display = 'blah'
      expect(component.hasAttribute('display', 'normal')).equal(true)
    })
  })

  describe('Test Attribute Blur', () => {
    it('should blur left and right pictures', () => {
      component.blur = 'true'
      component.applyBlur()
      expect(component.left_img.hasAttribute('class', 'blur')).equal(true)
      expect(component.center_img.hasAttribute('class', 'blur')).equal(false)
      expect(component.right_img.hasAttribute('class', 'blur')).equal(true)
    })

    it('should not blur left and right pictures', () => {
      component.blur = 'false'
      component.applyBlur()
      expect(component.left_img.hasAttribute('class', 'non_blur')).equal(true)
      expect(component.center_img.hasAttribute('class', 'blur')).equal(false)
      expect(component.right_img.hasAttribute('class', 'non_blur')).equal(true)
    })
  })

  describe('Test Switch Images', () => {
    it('should move all images left, and make the leftmost one right', () => {
      // Load initial pics
      component.number = 3
      component.imageFolder = '/testPic/'
      component.loadPics()
      component.switch()
      // Get original href before change
      var leftAddr = component.left_img.src.href
      var centerAddr = component.center_img.src.href
      var rightAddr = component.right_img.src.href
      // Switch and move images left
      component.switch()
      expect(component.left_img.src.href).equal(centerAddr)
      expect(component.center_img.src.href).equal(rightAddr)
      expect(component.right_img.src.href).equal(leftAddr)
    })
  })
})
