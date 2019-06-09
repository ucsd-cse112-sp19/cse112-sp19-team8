describe('Testing component Carousel', () => {
  var component

  beforeEach(function () {
    component = new Carousel()
  })

  describe('Test Attribute Number', () => {
    it('should make no change when set number < 3', () => {
      var origNum = component.number
      component.number = 2
      expect(component.number).equal(origNum)
    })

    it('should update number to 4', () => {
      component.number = 4
      expect(component.number).equal('4')
    })
  })

  describe('Test Attribute Interval', () => {
    it('should set interval to 3000', () => {
      component.interval = 3000
      expect(component.interval).equal('3000')
    })

    it('should set interval to 2000 when input empty', () => {
      component.interval = ''
      expect(component.interval).equal(2000)
    })
  })

  describe('Test Attribute Interval', () => {
    it('should set interval to 3000', () => {
      component.interval = 3000
      expect(component.interval).equal('3000')
    })

    it('should set interval to 2000 when input empty', () => {
      component.interval = ''
      expect(component.interval).equal(2000)
    })
  })

  describe('Test Attribute Display', () => {
    it('should set display to reverse', () => {
      component.display = 'reverse'
      expect(component.display).equal('reverse')
    })

    it('should set display to normal with wrong input', () => {
      component.display = 'blah'
      expect(component.display).equal('normal')
    })
  })

  describe('Test Attribute Blur', () => {
    it('should blur left and right pictures', () => {
      component.blur = 'true'
      component.applyBlur()
      expect(component.left_img.hasAttribute('class', 'blur')).equal(true)
      expect(component.right_img.hasAttribute('class', 'blur')).equal(true)
    })

    it('should not blur left and right pictures', () => {
      component.blur = 'false'
      component.applyBlur()
      expect(component.left_img.hasAttribute('class', 'non_blur')).equal(true)
      expect(component.right_img.hasAttribute('class', 'non_blur')).equal(true)
    })
  })
})
