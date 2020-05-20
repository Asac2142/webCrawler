const puppeter = require('puppeteer');
const url = 'https://news.ycombinator.com/';


const scrape = async () => {
    const browser = await puppeter.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);

    const result = await page.evaluate(() => {
        let scrapeData = [];
        const searchLimit = 30;
        const rankNumberNodeList = document.querySelectorAll('.rank');
        const titlesNodeList = document.querySelectorAll('.title > a');
        const commentsNodeList = document.querySelectorAll('.subtext');
        const pointsNodeList = document.querySelectorAll('.score');

        for (let i = 0; i < searchLimit; i++) {
            let rank = rankNumberNodeList[i] ? rankNumberNodeList[i].innerText.split('.')[0] : 0;
            let title = titlesNodeList[i] ? titlesNodeList[i].innerText : '';
            let comment = commentsNodeList[i] ? commentsNodeList[i].lastElementChild.innerHTML.split('&')[0] : 0;
            let points = pointsNodeList[i] ? pointsNodeList[i].innerText.split(' ')[0] : 0;

            scrapeData.push({
                "rank": rank,
                "title": title,
                "comment": comment,
                "score": points
            });
        }

        return scrapeData;
    });

    browser.close();
    return result;
};

scrape().then((scrapeData) => {
    console.log(scrapeData);
});
