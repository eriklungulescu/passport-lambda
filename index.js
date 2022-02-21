const api = require('lambda-api')();
const AWS = require('aws-sdk');
const ddbClient = new AWS.DynamoDB.DocumentClient({'region' : 'us-east-1'});


api.get('/contacts', (req, res) => {
    console.info("Successfully hit get /contacts");
    res.status(200).send({Response : "Successfully hit get /contacts"});
})

api.get('/contacts/:userId', (req, res) => {
    console.info("Successfully hit get /contacts/" + req.params.userId);
    res.status(200).send({Response : "Successfully hit get /contacts/" + req.params.userId});
})

api.post('/contacts', (req, res) => {
    console.info("Successfully hit post /contacts");
    res.status(200).send({Response : "Successfully hit post /contacts"});
})

api.any('/', (req, res) => {
    console.info("Request hit unknown endpoint");
    res.status(400).send("Uh Oh! Endpoint does not exist!")
})

exports.handler = async (event, context) => {
    return await api.run(event, context)
}