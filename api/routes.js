const h = require("./hands");

module.exports.setup = function(app) {
    app.get('/', function(req, res){
        res.send("Hello MusicPlayce!\n");
    });

    app.post('/', h.compareHands);
}
