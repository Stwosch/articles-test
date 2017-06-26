import { TheNYTappPage } from './app.po';

describe('the-nytapp App', () => {
  let page: TheNYTappPage;

  beforeEach(() => {
    page = new TheNYTappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
