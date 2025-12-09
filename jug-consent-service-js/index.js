const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { ConsentRequest, ConsentResponse } = require('@dduzgun-security/jug-model');

const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    })
    .use(morgan('tiny'))
    .use(bodyParser.json())
    .post('/consent', (req, res) => {
        try {
            const consentRequest = ConsentRequest.deserializeBinary(Buffer.from(req.body.data, 'base64'));
            const consent = consentRequest.getConsent();
            
            console.log(`Received consent from user ${consent.getUserId()}: ${consent.getConsent()}`);
        } catch (error) {
            console.error('Error processing consent request:', error);
            res.status(400).send('Invalid consent request');
        }
    })