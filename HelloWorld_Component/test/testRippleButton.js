describe('Testing component RippleButton', () => {
  var component
  var div

  beforeEach(function () {
    component = new RippleButton()
    component.update()
    div = component.shadowRoot.querySelector('.container')
  })

  it('should have children node in div', () => {
    expect(div.hasChildNodes()).equal(true)
  })

  it('button innver div should have same class as RippleButton', () => {
    expect(div.getAttribute('class', component.class)).equal('container')
  })
})
