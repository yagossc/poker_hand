module.exports.setup = function(app) {
    app.get('/', function(req, res){
        res.send("Hello server!");
    })
}
