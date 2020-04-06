const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { should } = require("chai");

require("chromedriver");

should();

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Sandbox", () => {
  let browser;

  before(async function fn() {
    this.timeout(20000);
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await browser.get("https://e2e-boilerplate.github.io/sandbox/");
  });

  after(() => {
    browser.quit();
  });

  it("Should be on Sandbox", async () => {
    const title = await browser.getTitle();
    title.should.eql("Sandbox");

    const header = await browser.findElement(By.css("h1")).getText();
    header.should.eql("Sandbox");
  });
});
