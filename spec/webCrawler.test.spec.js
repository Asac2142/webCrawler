const webcrawler = require('../src/webCrawler');

describe('Web-crawler application', () => {
    let unsortedWebsiteData, expectedDataSortedByScore, expectedDataSortedByNumberOfComments;
    let unfilteredWebsiteData;
    let titleLength;
    let condition;

    beforeEach(() => {
        titleLength = 5;
        condition = 'greater';
        unsortedWebsiteData =
            [
                {
                    'rank': '5',
                    'title': 'Notion for everyone',
                    'comment': '250',
                    'score': '18'
                },
                {
                    'rank': '17',
                    'title': 'Signal PINs',
                    'comment': '88',
                    'score': '74'
                },
                {
                    'rank': '8',
                    'title': 'Old bills in Yemen are worth 10% more than new ones',
                    'comment': '25',
                    'score': '25'
                }
            ]

        expectedDataSortedByScore =
            [{
                'rank': '5',
                'title': 'Notion for everyone',
                'comment': '250',
                'score': '18'
            },
            {
                'rank': '8',
                'title': 'Old bills in Yemen are worth 10% more than new ones',
                'comment': '25',
                'score': '25'
            },
            {
                'rank': '17',
                'title': 'Signal PINs',
                'comment': '88',
                'score': '74'
            }];

        expectedDataSortedByNumberOfComments =
            [
                {
                    'rank': '8',
                    'title': 'Old bills in Yemen are worth 10% more than new ones',
                    'comment': '25',
                    'score': '25'
                },
                {
                    'rank': '17',
                    'title': 'Signal PINs',
                    'comment': '88',
                    'score': '74'
                },
                {
                    'rank': '5',
                    'title': 'Notion for everyone',
                    'comment': '250',
                    'score': '18'
                }
            ]

        unfilteredWebsiteData = unsortedWebsiteData;
    });

    it('should sort by score on the scrapped data array', () => {
        const sortedDataByScore = webcrawler.sortBy('score', unsortedWebsiteData);
        expect(sortedDataByScore).toEqual(expectedDataSortedByScore);
    });

    it('should sort by number of comments on the scrapped data array', () => {
        const sortedDataByComments = webcrawler.sortBy('comment', unsortedWebsiteData);
        expect(sortedDataByComments).toEqual(expectedDataSortedByNumberOfComments);
    });

    it('should filter the scrapped data array by title which its length is greater than 5', () => {
        const filteredData = webcrawler.filterByTitleLength(titleLength, condition, unsortedWebsiteData);
        expect(filteredData).toEqual(unfilteredWebsiteData);
    });

    it('should get a 0 array length when titles length is less than or equal to 5', () => {
        condition = 'less than';
        const filteredData = webcrawler.filterByTitleLength(titleLength, condition, unsortedWebsiteData);
        expect(filteredData.length).toBe(0);
    });
});
