const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {consent} = require('@dduzgun-security/jug-model');

const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    })
    .use(morgan('tiny'))
    .use(bodyParser.json())
    .post('/consent', (req, res) => {
        try {
            // Create Consent model from raw HTTP JSON
            const consentModel = new consent.Consent();
            consentModel.setEmail(req.body.email);
            consentModel.setConsent(req.body.consent);

            console.log('Received consent:', consentModel.toObject());

            // Create ConsentResponse model
            const consentResponse = new consent.ConsentResponse();
            consentResponse.setMessage('Consent received successfully');

            // Return response as plain object
            res.status(200).json(consentResponse.toObject());
        } catch (error) {
            console.error('Error processing consent request:', error);
            res.status(400).json({ error: 'Invalid consent request' });
        }
    })
    .listen(PORT, () => console.log(`Jug Consent Service running on port ${PORT}`));