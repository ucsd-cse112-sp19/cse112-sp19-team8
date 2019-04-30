describe('Testing component CoreHello', () => {
  it('should show Hello World with raw tag', () => {
    const component = new CoreHello()
    expect(component.msg.innerHTML).equal('Hello World')
  })

  it('should have rgb(100, 50, 150) as initial color', () => {
    const component = new CoreHello()
    expect(component.bgColor.red).equal(100)
    expect(component.bgColor.green).equal(50)
    expect(component.bgColor.blue).equal(150)
  })

  it('should update language to Japanese', () => {
    const component = new CoreHello()
    component.lang = 'jp'
    expect(component.msg.innerHTML).equal('こんにちは世界 ')
  })

  it('should update language to Greek', () => {
    const component = new CoreHello()
    component.lang = 'Greek'
    expect(component.msg.innerHTML).equal('Γειά σου Κόσμε ')
  })

  it('should update language to Spanish', () => {
    const component = new CoreHello()
    component.lang = 'Spanish'
    expect(component.msg.innerHTML).equal('Hola Mundo ')
  })

  it('should update language to English (invalid case)', () => {
    const component = new CoreHello()
    component.lang = 'InvalidLanguage'
    expect(component.msg.innerHTML).equal('Hello World ')
  })
})
