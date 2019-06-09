import { Selector } from 'testcafe'; // first import testcafe selectors

fixture `--- Component Tests ---`// declare the fixture
    .page `../public/componentDemo.html`;  // specify the start page

// Expect carousel's starting interval to be 1700
test('Carousel Initial Test', async t => {
    await t
        .click('#itv-plus')
        .expect(Selector('#carousel').getAttribute('interval')).eql('1700');
});

// Expect timeline's starting child node count to be 4
test('Timeline Initial Test', async t => {
    await t
        .click('#itv-plus')
        .expect(Selector('#timeline').childNodeCount).eql(4);
});

//test('RippleButton Initial Test', async t => {
//  await t
      //  .click()
      //  .expect(Selector('#RippleButton').something);
//});
