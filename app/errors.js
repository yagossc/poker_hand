// handler is the custom error handler for the api/express
module.exports.handler = function(err, req, res, next) {
    var error_codes = new Map([
        ["invalid.input", "Invalid input value/format."],
        ["invalid.hand", "Invalid card in input hand."],
    ]);

    // Send 'Bad Request' status
    let err_message = "Internal Server Error";
    let code = 400;
    error_codes.has(err.message) ? err_message = error_codes.get(err.message) : code = 500;
    res.status(code);
    res.json({ message: err_message });
}
