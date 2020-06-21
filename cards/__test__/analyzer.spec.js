const analyzer = require('../analyzer');

test("Test Poker Hands Classification", () => {
        let expectedHands = [
            ["ah", "2h", "3h", "4h", "5h"],
            ["2h", "2d", "2c", "3c", "3s"],
            ["as", "2h", "3h", "4h", "5h"],
            ["2h", "2d", "3d", "3c", "4s"],
            ["2h", "9d", "3d", "5c", "4s"],
            ["3h", "3d", "3c", "8d", "jc"],
        ]

        let testHands = [
            [["ah", "2h", "3h", "4h", "5h"], ["2h", "2d", "2c", "2s", "3s"]],
            [["2h", "2d", "2c", "3c", "3s"], ["7h", "2h", "3h", "4h", "5h"]],
            [["as", "2h", "3h", "4h", "5h"], ["2h", "2d", "2c", "3c", "4s"]],
            [["2h", "2d", "3d", "3c", "4s"], ["2h", "2d", "3d", "5c", "4s"]],
            [["2h", "9d", "3d", "5c", "4s"], ["2h", "7d", "3d", "5c", "4s"]],
            [["2h", "2c", "2s", "9c", "jh"], ["3h", "3d", "3c", "8d", "jc"]],
        ];

        testHands.forEach((hands, index) => {
            expect(analyzer.rankHands(hands[0], hands[1])).toEqual(expectedHands[index]);
        })
})
