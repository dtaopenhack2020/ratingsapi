module.exports = async function (context, req) {


    context.log(req);
    const cosmos = require('@azure/cosmos');
    //const endpoint = process.env.COSMOS_API_URL;
    //Enter env variable in loadsettings.json file 
    //COSMOS_API_URL 
    //COSMOS_API_KEY
    //const key = process.env.COSMOS_API_KEY;


    const endpoint = "https://team20tr.documents.azure.com:443/";
    const key = "GrmVMINe94HGKE7UexQOvXsDI2sAuPViM346KpwG1Pte7ajNljFav3vgMr1kB8QQsPh0Z9w9dLXkVTponxBb7g==";


    const { CosmosClient } = cosmos;
    var result = {};


    const client = new CosmosClient({ endpoint, key });
    // All function invocations also reference the same database and container.
    const container = client.database("BFYOC").container("IcecreamRatings");


    context.log('JavaScript HTTP trigger function processed a request.');


    const ratingId = (req.query.ratingId || (req.body && req.body.ratingId));


    const { resources: itemArray } = await container.items.readAll().fetchAll();
    context.log(itemArray);


    itemArray.forEach(element => {
        if (element.id == ratingId) {
            result = element;
        }
    });


    if (result != null) {
        context.res.body = JSON.stringify(result);
        context.log(context.res.body);
    } else{
        context.res.body = "No records found"; 
    }
    context.done();

}