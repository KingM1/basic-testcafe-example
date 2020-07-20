import { Selector, t, ClientFunction } from 'testcafe';

function getUrl() {
    const clientfunction = ClientFunction(() => document.location.href);
    return clientfunction();
}

fixture('Logo test')
    .beforeEach(async () => {
        await t
            .navigateTo('https://www.anthropologie.com/search?q=dress');
    });

test('Logo click should navigate to the homepage', async (t) => {
    await t
        .expect(Selector('.c-pwa-site-header-logo__link').visible).ok()
        .click(Selector('.c-pwa-site-header-logo__link'))
        .expect(getUrl()).eql('https://www.anthropologie.com/?ref=logo');
});
