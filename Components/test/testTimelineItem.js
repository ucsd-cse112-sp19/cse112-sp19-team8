describe('Testing component Timeline Item', () => {
  var component

  beforeEach(function () {
    component = new TimelineItem()
  })

  describe('Test Set Content', () => {
    it('should update content text when property changes', () => {
      component.content = 'fortest'
      expect(component.item.querySelector('.content').innerHTML).equal('fortest')
    })
  })

  describe('Test Set Timestamp', () => {
    it('should update timestamp text when property changes', () => {
      component.timestamp = '1101'
      expect(component.item.querySelector('.timestamp').innerHTML).equal('1101')
    })
  })

  describe('Test Update Position', () => {
    it('item should only have class left by default', () => {
      component.updatePosition()
      expect(component.item.classList.contains('left')).equal(true)
      expect(component.item.classList.contains('right')).equal(false)
    })

    it('item should only have class left', () => {
      component.position = 'left'
      component.updatePosition()
      expect(component.item.classList.contains('left')).equal(true)
      expect(component.item.classList.contains('right')).equal(false)
    })

    it('item should only have class right', () => {
      component.position = 'right'
      component.updatePosition()
      expect(component.item.classList.contains('left')).equal(false)
      expect(component.item.classList.contains('right')).equal(true)
    })
  })
})
