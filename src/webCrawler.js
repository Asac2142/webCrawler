const puppeter = require('puppeteer');
const length = 5;
let filteredScrapeData, sortedScrapeData;
let condition, parameter;

const scrape = async (url) => {
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

const filterByTitleLength = (length, condition, scrapeData) => {
    return condition === 'greater' ?
        scrapeData.filter(data => data['title'].length > length) :
        scrapeData.filter(data => data['title'].length <= length);
};

const sortBy = (parameter, scrapeData) => {
    return scrapeData.sort((a, b) => +a[parameter] - (+b[parameter]));
};

// Test
scrape('https://news.ycombinator.com/').then((scrapeData) => {
    condition = 'greater';
    parameter = 'score';
    filteredScrapeData = filterByTitleLength(length, condition, scrapeData);
    sortedScrapeData = sortBy(parameter, filteredScrapeData);
    console.log(`Scrape data filtered by length [${length}], condition [${condition}] :`, filteredScrapeData);
    console.log(`Scrape data sorted by parameter [${parameter}] :`, sortedScrapeData);

    condition = 'less than';
    parameter = 'comments';
    filteredScrapeData = filterByTitleLength(length, condition, scrapeData);
    sortedScrapeData = sortBy(parameter, filteredScrapeData);
    console.log(`Scrape data filtered by length [${length}], condition [${condition}] :`, filteredScrapeData);
    console.log(`Scrape data sorted by parameter [${parameter}] :`, sortedScrapeData);
});


exports.scrape = scrape;
exports.filterByTitleLength = filterByTitleLength;
exports.sortBy = sortBy;
