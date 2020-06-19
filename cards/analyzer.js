/**
   This module does not count jokers
   as part of a valid poker deck.
**/

const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
const suits = ['h', 'd', 'c', 's'];

// classify classifies a given poker hand
module.exports.classify = function(hand) {
    let handNumbers = hand.map( card => numbers.indexOf(card.split("")[0]));
    let handSuits = hand.map( card => suits.indexOf(card.split("")[1]));

    groups = checkRepeating(handNumbers);
    straight = groups[0] === 1 && isStraight(handNumbers);

    isFlush = handSuits.every(suit => suit === handSuits[0]);

    if      (isFlush && straight)              return "straight-flush";
    else if (groups[0] == 4)                   return "four-of-a-kind";
    else if (groups[0] == 3 && groups[1] == 2) return "full-house";
    else if (isFlush)                          return "flush";
    else if (straight)                         return "straight";
    else if (groups[0] == 3)                   return "three-of-a-kind";
    else if (groups[0] == 2 && groups[1] == 2) return "two-pair";
    else if (groups[0] == 2)                   return "pair";
    else                                       return "high-card";
}

// checkRepeating checks if there are repeating
// numbers in a given hand, for the purpose of
// accounting for full-houses, i.e., pairs and
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

        resolve();
    });
}
