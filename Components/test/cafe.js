import { Selector } from 'testcafe'; // first import testcafe selectors

fixture `Getting Started`// declare the fixture
    .page `../public/componentDemo.html`;  // specify the start page


//then create a test and place your code there
test('My first test', async t => {
    await t
        .click('#itv-plus')

        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Selector('#carousel').getAttribute('interval')).eql('1700');
});

test('My first test', async t => {
    await t
        .click('#itv-plus')

        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Selector('#timeline').childNodeCount).eql(4);
});
