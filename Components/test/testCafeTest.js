//just to make sure testcafe is integrated correctly

import Page from './page-model';

fixture `My fixture`
    .page `https://devexpress.github.io/testcafe/example/`;

test('Check Label HTML', async t => {
    const label = Selector('label').addCustomDOMProperties({
        innerHTML: el => el.innerHTML
    });

    await t
        .expect(label.innerHTML).contains('type="checkbox"')
        .expect(label.innerHTML).contains('name="remote"');
});
