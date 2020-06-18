const analyzer = require('../analyzer');

test("Test Poker Hands Classification", () => {
        let expectedHands = [
            "straight-flush",
            "four-of-a-kind",
            "full-house",
            "flush",
            "straight",
            "three-of-a-kind",
            "two-pair",
            "pair",
            "high-card",
        ]

        let testHands = [
            ["ah", "2h", "3h", "4h", "5h"],
            ["2h", "2d", "2c", "2s", "3s"],
            ["2h", "2d", "2c", "3c", "3s"],
            ["7h", "2h", "3h", "4h", "5h"],
            ["as", "2h", "3h", "4h", "5h"],
            ["2h", "2d", "2c", "3c", "4s"],
            ["2h", "2d", "3d", "3c", "4s"],
            ["2h", "2d", "3d", "5c", "4s"],
            ["2h", "9d", "3d", "5c", "4s"],
        ];

        testHands.forEach((hand, index) => {
            expect(analyzer.classify(hand)).toBe(expectedHands[index]);
        })
})
