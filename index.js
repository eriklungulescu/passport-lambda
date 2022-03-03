const api = require('lambda-api')();
const AWS = require('aws-sdk');
const ddbClient = new AWS.DynamoDB.DocumentClient({'region' : 'us-east-1'});
const contact = require('./models/contact.js').contact

api.get('/contacts', (req, res) => { //Todo: Get rid
    console.info("Successfully hit get /contacts");
    res.status(200).send({Response : "Successfully hit get /contacts"});
})

api.get('/contacts/:userId', async (req, res) => {
    console.info("Successfully hit get /contacts/" + req.params.userId);
    try {    
        const params = {
            TableName: "passport-users",
            Key: {"userId" :  req.params.userId}
        }
        var dynamodbRes = await ddbClient.get(params).promise();
        console.info("Response from DynamoDb: " + JSON.stringify(dynamodbRes));
        res.status(200).send(dynamodbRes.Item);
    } catch (error) {
        console.error("Occurred when receiving from dynamoDb " + error);
        res.status(400).send({Response : "Error occured: " + error});
    }
})

api.post('/contacts', async (req, res) => {
    console.info("Successfully hit post /contacts");
    console.info("Items: " + req.body.userId + " " + req.body.name + " " + req.body.mobile + " " + req.body.linkedin + " " + req.body.facebook);
    // console.info(JSON.stringify(req.body));
    try {
        var params = {
            TableName: 'passport-users',
            Item: new contact(req.body.userId, req.body.name, req.body.mobile, req.body.linkedin, req.body.facebook)
        };
        var dynamodbRes = await ddbClient.put(params).promise();
        console.info("Successfully put object in DynamoDb");
        res.status(200).send({Response : "Successfully put object in DynamoDb"});
    } catch (error) {
        console.error("Occurred when putting value in dynamoDb " + error);
        res.status(400).send({Response : "Error occured: " + error});
    }
})

api.any('/', (req, res) => {
    console.info("Request hit unknown endpoint");
    res.status(400).send("Uh Oh! Endpoint does not exist!")
})

exports.handler = async (event, context) => {
    return await api.run(event, context)
}