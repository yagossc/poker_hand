// Server module
const server = require('./api/server');

/**
   The steps here will probably be:
   1 - Load the analyzer and server modules;
   2 - Startup the server;
     2.1 - Setup the route(s);
   3 - Listen...
     3.1 - Validate input;
     3.2 - Define winner;
     3.3 - Reply;
     3.4 - Keep listening;
**/

// Define main
async function main(){
     try {
        await server.init();
        await server.run(8080);
        console.log("Server up and running. Listenning at 8080");
    }catch(err){
        console.error("Error: "+err.message);
        process.exit(1);
    }
}

// Call main
main();
