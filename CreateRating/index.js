const request = require ('request')
const userUrl = process.env.UsersBaseUrl
const productUrl = process.env.ProductBaseURL
const productsUrl = process.env.ProductsBaseURL

module.exports = async function (context, req) {

    var res = {
        // status: 200, /* Defaults to 200 */
        // body: responseMessage
    };

    if (req.body) {
        try {
            var userId = req.body.userId;
            var productId = req.body.productId;
        } catch (error) {
            res.status = 404;
            res.body = "Malformed Body"  
        }
    }
    
    // check if product exists
    // check if user exists

    if (checkUser(userId) && checkProduct(productId) ) { //user and product were found
        context.log('Body');
        context.log(req.body);
        
        res.status = 200;
        res.body = "user and product found"

        context.res = res;

        context.done();
    }
    else {
        res.status = 404;
        res.body = "user and product NOT found. Invalid request"      

        context.res = res;

        context.done();
    }
    // create guid
    // create timestamp
    // write to db
        // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    // };
}

function checkUser(userId) {
    var params = {
        uri: userUrl + userId,
        body: {}
    }

    request.get(params, (error, response, data) => {
        if (response.statusCode == 200) {
            context.log(" User Found:")
            context.log(response)

            return true;
        }

        return false;
    })
}

function checkProduct(productId) {
    var params = {
        uri: productUrl + productId,
        body: {}
    }

    request.get(params, (error, response, data) => {

        if (response.statusCode == 200) {
            context.log("Product Found Found:")
            context.log(response)

            return true;
        }

        return false;
    })
}