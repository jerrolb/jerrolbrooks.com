const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

textQuery = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        const QUERY = req.query.text;

        if (QUERY) {
            res.send({
                response: {
                    query: QUERY
                },
                status: 200
            });
        } else {
            res.status(500).send({
                message: 'Error! Please enter some text',
                status: 500
            })
        }
    });
});

hello = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        res.send("HI from the API");
    });
});

module.exports = {
    textQuery,
    hello
}
