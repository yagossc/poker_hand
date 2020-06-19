const _ = require("lodash");
const analyzer = require("../cards/analyzer");

// POST "/" handler function
module.exports.compareHands = async function(req, res, next) {
    incoming = sanitizeInput(req.body);

    try {
        await validateInput(incoming);
        splitH1 = incoming.h1.split(" ");
        splitH2 = incoming.h2.split(" ");
        await analyzer.validateHand(splitH1);
        await analyzer.validateHand(splitH2);

        h1Class = analyzer.classify(splitH1);
        h2Class = analyzer.classify(splitH2);

        console.log(h1Class+" "+h2Class+"\n");
        res.send(h1Class+" "+h2Class+"\n");

    }catch(err){
        console.error('Error: '+err.message);
        next(err);
    }
}

/**
   validateInput validates the received
   poker hands for comparison
**/
async function validateInput(data) {
    return new Promise(function(resolve, reject){
        try {
            if (!data.h1 || !data.h2) {
                throw new Error('invalid.input');
            }
            if (data.h1.split(" ").length != 5) {
                throw new Error('invalid.hand');
            }
            if (data.h2.split(" ").length != 5) {
                throw new Error('invalid.hand');
            }
        }catch(err){
            reject(err);
        }
        resolve();
    });
}

/**
   sanitizeInput returns only the desired/allowed
   fields from data, according to schema.
**/
function sanitizeInput(data) {
    // If data is undefined|null|false,
    // initialize and empty object for it
    data = data || {};

    // Check schema for fields
    hand = {h1: null, h2: null};

    // Return only desired fields
    return _.pick(_.defaults(data, hand), _.keys(hand));
}
