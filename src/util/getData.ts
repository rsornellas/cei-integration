import puppeteer from "puppeteer";

interface payload {
  username: string;
  password: string;
}

const getData = async (payload: payload) => {
  const { username, password } = payload;
  const url = "https://cei.b3.com.br/CEI_Responsivo/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url, { waitUntil: "networkidle0" });

  await page.evaluate(
    (username, password) => {
      document.querySelector<any>(
        "#ctl00_ContentPlaceHolder1_txtLogin"
      ).value = username;
      document.querySelector<any>(
        "#ctl00_ContentPlaceHolder1_txtSenha"
      ).value = password;
      document
        .querySelector<any>("#ctl00_ContentPlaceHolder1_btnLogar")
        .click();
    },
    username,
    password
  );

  await page.waitForNavigation({ waitUntil: "networkidle0" });

  await page.evaluate(() => {
    document
      .querySelector<any>(
        "#ctl00_ContentPlaceHolder1_sectionCarteiraAtivos p a"
      )
      .click();
  });

  await Promise.all([
    page.click('#ctl00_ContentPlaceHolder1_repTabelaAtivos_ctl04_LinkButton2'),
    page.waitForNavigation(),
  ]);

  const content = await page.evaluate(() =>
    document.body.innerHTML
  );

  await browser.close();

  return content;
};

export default getData;
