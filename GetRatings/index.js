module.exports = async function (context, req) {

    context.log(req);
    const cosmos = require('@azure/cosmos');
    //const endpoint = process.env.COSMOS_API_URL;
    //Enter env variable in loadsettings.json file 
    //COSMOS_API_URL 
    //COSMOS_API_KEY
    //const key = process.env.COSMOS_API_KEY;
    const request = require('async-request');
    const userUrl = "https://serverlessohuser.trafficmanager.net/api/GetUser";

    const endpoint = "https://team20tr.documents.azure.com:443/";
    const key = "GrmVMINe94HGKE7UexQOvXsDI2sAuPViM346KpwG1Pte7ajNljFav3vgMr1kB8QQsPh0Z9w9dLXkVTponxBb7g==";

    const { CosmosClient } = cosmos;
    var result = {};

    const client = new CosmosClient({ endpoint, key });
    // All function invocations also reference the same database and container.
    const container = client.database("BFYOC").container("IcecreamRatings");

    context.log('JavaScript HTTP trigger function processed a request.');

    const userId = (req.query.userId || (req.body && req.body.userId));

    var user = await request(userUrl + "?userId=" + userId)
    if (user.statusCode !== 200) {
        context.log("User not found");
        context.res.status = 404;
        context.res.body = ("User not found");
    }
    else {
        console.log(`Querying container: Items`);

        // query to return all items
        const querySpec = {
            query: "SELECT * from c"
          // query: "SELECT * from c"     
        };

        // read all items in the Items container
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        var itemArray = [];
        items.forEach(item => {
            if (item.userId==userId) {
               itemArray.push(item);
            }
  //          context.log(`${item.id} - ${item.description}`);
        });
    };

    if (result != null) {
        context.res.body = itemArray;
        context.log(context.res.body);
    } else {
        context.res.body = "No records found";
    }
    context.done();
}