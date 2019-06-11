import { Selector } from 'testcafe'; // first import testcafe selectors

fixture `--- Component Demo Tests ---`// declare the fixture
    .page `../public/componentDemo.html`;  // specify the start page

//Tests starting interval for Carousel
test('Carousel Interval Test', async t => {
    await t
        .click('#itv-plus')
        .expect(Selector('#carousel').getAttribute('interval')).eql('1700');
});

//Tests number of child nodes for timeline
test('Timeline Child Node Test', async t => {
    await t
        .click('#itv-plus')
        .expect(Selector('#timeline').childNodeCount).eql(4);
});

//tests that RippleButton exists
test('RippleButton Initial Test', async t => {
    await t
        .expect(Selector('#testButton').exists).ok();
});

//Tests UI animation for RippleButton
//test('RippleButton Initial Test', async t => {
//    await t
//        .expect(Selector('#testButton').exists).ok();
//});
