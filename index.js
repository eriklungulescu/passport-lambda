const api = require('lambda-api')();
const AWS = require('aws-sdk');
const ddbClient = new AWS.DynamoDB.DocumentClient({'region' : 'us-east-1'});


api.get('/contacts', (req, res) => {
    console.info("Request: " + JSON.stringify(req));
    res.JSON("Successfully hit get endpoint");
})

api.get('/contacts/:userId', (req, res) => {
    console.info("Request: " + JSON.stringify(req));
    res.JSON("Successfully hit get with userId" + req.params.userId + "endpoint");
})

api.post('/contacts', (req, res) => {
    console.info("Request: " + JSON.stringify(req));
    res.JSON("Successfully hit post endpoint")
})

module.exports = async (event, context) => {
    return await api.run(event, context, (error) => {
        if (error) {
            console.error("Encountered error: " + error);
        } else {
            console.info("Successfully processed request");
        }
    })
}