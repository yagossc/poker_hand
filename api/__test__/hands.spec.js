const request = require('supertest');
const server = require('../server');

let testBody = [
    {h1: "2c 2d 2h 6s 5h", h2: "3c 3d 3s 4h 5c"},
    {h1: "2c 2d 2h 2h 5h", h2: "3c 3d 3s 4h 5c"},
    {h1: "2c 2d 2h 7c 5h", h2: "3c 3d 3s 2c 5c"},
]

let expectedResponse = [
    {status: 200, content: {"winner":"3c 3d 3s 4h 5c"}},
    {status: 500, content: {"message":"Internal Server Error"}},
    {status: 400, content: {"message":"Invalid card in input hand."}},
]


describe("POST / {body: {\"hand1\", \"hand2\"}}", function(){

    it("sends valid/invalid requests to the API", async function(done){
        await server.init()

        let app = server.get().app;

        testBody.forEach((body, index) => {
            request(app).
                post('/').
                set('Accept', 'application/json').
                expect('Content-Type', /json/).
                send(body).
                expect(expectedResponse[index].status, expectedResponse[index].content).
                end(function(err, res){
                    if(err) return done(err);
                    done();
                })
        });
    });
});
