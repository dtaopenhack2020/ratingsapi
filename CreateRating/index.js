// const rp = require('request-promise');
const request = require('async-request')
const userUrl = process.env.UsersBaseUrl
const productUrl = process.env.ProductBaseURL
const { v4: uuidv4 } = require('uuid')

module.exports = async function (context, req) {

    var res = {
        // status: 200, /* Defaults to 200 */
        // body: responseMessage
    };
    var obj

    context.log(req.body)

    if (req.body) {

        try {

            var userId = req.body.userId;
            var productId = req.body.productId;
            obj = req.body;

        } catch (error) {
            res.status = 404;
            res.body = "Malformed Body"

            context.res = res;

            context.done();

        }

        context.log(obj)
    }

    // check if product and user exist
    var product = await request(productUrl + "?productId=" + productId)
    var user = await request(userUrl + "?userId=" + userId)

    if ((product.statusCode !== 200) || (user.statusCode !== 200)) {

        context.log("user or product not found")

        res.status = 404;
        res.body = "User or Product NOT found. Invalid request"

    }
    else {

        // create guid
        obj.id = uuidv4();
        // create timestamp
        obj.timestamp = (new Date).toISOString()
        context.log(obj)
        // write to db

        context.bindings.ratingsDoc = JSON.stringify(obj);

        res.status = 200;
        res.headers = {
            "Content-Type": "application/json"
        }
        res.body = JSON.stringify(obj)
    }

    context.res = res;
}
