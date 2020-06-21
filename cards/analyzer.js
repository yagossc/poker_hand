/**
   This module does not count jokers
   as part of a valid poker deck. Also,
   there's some redundancy in this code,
   breaking the DRY principle, but given
   the time frame, this is a solution and
   not an optimal solution.
**/

// Types of hands values enumeration
var HTypes = {
    STRAIGHT_FLUSH:  9,
    FOUR_OF_A_KIND:  8,
    FULL_HOUSE:      7,
    FLUSH:           6,
    STRAIGHT:        5,
    THREE_OF_A_KIND: 4,
    TWO_PAIR:        3,
    PAIR:            2,
    HIGH_CARD:       1,
}

const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
const suits = ['h', 'd', 'c', 's'];

// classify classifies a given poker hand
function classify(hand) {
    let handNumbers = hand.map( card => numbers.indexOf(card.split("")[0]));
    let handSuits = hand.map( card => suits.indexOf(card.split("")[1]));

    groups = checkRepeating(handNumbers);
    straight = groups[0] === 1 && isStraight(handNumbers);

    isFlush = handSuits.every(suit => suit === handSuits[0]);

    if      (isFlush && straight)              return HTypes.STRAIGHT_FLUSH;
    else if (groups[0] == 4)                   return HTypes.FOUR_OF_A_KIND;
    else if (groups[0] == 3 && groups[1] == 2) return HTypes.FULL_HOUSE;
    else if (isFlush)                          return HTypes.FLUSH;
    else if (straight)                         return HTypes.STRAIGHT;
    else if (groups[0] == 3)                   return HTypes.THREE_OF_A_KIND;
    else if (groups[0] == 2 && groups[1] == 2) return HTypes.TWO_PAIR;
    else if (groups[0] == 2)                   return HTypes.PAIR;
    else                                       return HTypes.HIGH_CARD;
}

// checkRepeating checks if there are repeating
// numbers in a given hand, for the purpose
// of accounting for full-houses, pairs and
// three-of-a-kind, and four-of-a-kind
function checkRepeating(handNumbers) {
    let count = new Array(13).fill(0);

    handNumbers.forEach( num => {
        count[num]++
    })
    return count.filter(amount => amount > 0).sort((a, b) => b - a);
}

// checkStraight checks if the five numbers
// in a hand are in order taking into account
// the Ace's double role in the matter
function isStraight(handNumbers) {

    sorted = handNumbers.sort((a, b) => a - b);
    if (sorted[0]+4 == sorted[4]) {
        return true;
    }

    // check for A,2,3,4,5
    if (sorted[4] == 12 && sorted[0] == 0 && sorted[3] == 3) {
        return true;
    }

    return false;
}

// unties the hands based on the
//  high card and/or on the suit
function untie(h1, h2, hClass) {
    switch (hClass) {
    case HTypes.HIGH_CARD:
        return getHighCard(h1) > getHighCard(h2) ? h1 : h2 ;

    case HTypes.PAIR:
        pairH1 = getRepeating(h1)[0];
        pairH2 = getRepeating(h2)[0];
        if (pairH1 == pairH2) {
            return getHighCard(h1) > getHighCard(h2) ? h1 : h2 ;
        }
        return pairH1 > pairH2 ? h1 : h2;

    case HTypes.TWO_PAIR:
        pair1_H1 = getRepeating(h1)[0];
        pair1_H2 = getRepeating(h2)[0];
        pair2_H1 = getRepeating(h1)[1];
        pair2_H2 = getRepeating(h2)[1];
        if (pair1_H1 == pair1_H2 && pair2_H1 == pair2_H2) {
            return getHighCard(h1) > getHighCard(h2) ? h1 : h2 ;
        }

        if (pair1_H1 == pair1_H2) {
            return pair2_H1 > pair2_H2 ? h1 : h2;
        }

        return pair1_H1 > pair1_H2 ? h1 : h2;

    case HTypes.THREE_OF_A_KIND:
        threeH1 = getRepeating(h1)[0];
        threeH2 = getRepeating(h2)[0];

        return threeH1 > threeH2 ? h1 : h2;

    case HTypes.STRAIGHT:
        return getHighCard(h1) > getHighCard(h2) ? h1 : h2 ;

    case HTypes.FLUSH:
        return getHighCard(h1) > getHighCard(h2) ? h1 : h2 ;

    case HTypes.FULL_HOUSE:
        threeH1 = getRepeating(h1)[0];
        threeH2 = getRepeating(h2)[0];

        return threeH1 > threeH2 ? h1 : h2;

    case HTypes.FOUR_OF_A_KIND:
        fourH1 = getRepeating(h1)[0];
        fourH2 = getRepeating(h2)[0];

        return fourH1 > fourH2 ? h1 : h2;

    case HTypes.STRAIGHT_FLUSH:
        sfH1 = getHighFlush(h1);
        sfH2 = getHighFlush(h2);

        if (sfH1 == sfH2) return "It's a TIE"
        return sfH1 > sfH2 ? h1 : h2;
    }

}

// getHighCard returns the highest
// card of a given hand
function getHighCard(hand) {
    let handNumbers = hand.map( card => numbers.indexOf(card.split("")[0]));
    return handNumbers.sort((a, b) => b - a)[0];
}

// getRepeating returns the an array
// of the repetead cards in a given hand
function getRepeating(hand) {
    let handNumbers = hand.map( card => numbers.indexOf(card.split("")[0]));

    let count = new Array(13).fill(0);

    handNumbers.forEach( num => {
        count[num]++
    })

    return count.filter(num => num > 1).sort((a, b) => b - a);
}

// getHighFlush checks the flush special Ace case
// and returns the highest flush card
function getHighFlush(hand) {

    let handNumbers = hand.map( card => numbers.indexOf(card.split("")[0]));
    sorted = handNumbers.sort((a, b) => a - b);

    // check for A,2,3,4,5
    if (sorted[4] == 12 && sorted[0] == 0 && sorted[3] == 3) {
        return sorted[3];
    }

    return sorted[4];
}


// rankHands ranks the two hands according to the
// HTypes enumeration
module.exports.rankHands = function(h1, h2) {
    h1Class = classify(h1);
    h2Class = classify(h2);

    if (h1Class === h2Class) {
        return untie(h1, h2, h1Class);
    }

    return h1Class > h2Class ? h1 : h2;
}

// validHand checks if a given five cards hand is valid
module.exports.validateHand = function(hand){
    return new Promise(function(resolve, reject){

        let handNumbers = hand.map( card => numbers.indexOf(card.split("")[0]));
        let handSuits = hand.map( card => suits.indexOf(card.split("")[1]));

        let lengths = hand.map(card => card.split("").length);

        if (handNumbers.some(number => number === -1) || handSuits.some(suit => suit === -1)) {
            reject("invalid.input");
        }

        if (lengths.some(length => length < 2) || lengths.some(length => length > 3)) {
            reject("invalid.input");
        }

        hand.forEach((card, index, arr) => {
            for (i = index + 1; i < hand.length; i++) {
                if (card == arr[i]) {
                    reject("invalid.input");
                }
            }
        });

        resolve();
    });
}
