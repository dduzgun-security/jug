import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { consent } from '@dduzgun-security/jug-model';
import { create, toJson } from '@bufbuild/protobuf';
import { createValidator } from '@bufbuild/protovalidate';

const PORT = process.env.PORT || 8000;

// Initialize validator
const validator = createValidator();

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
            const consentModel = create(consent.ConsentSchema, {
                email: req.body.email,
                consent: req.body.consent
            });

            // Validate the consent message
            const validationResult = validator.validate(consent.ConsentSchema, consentModel);
            if (validationResult.kind !== 'valid') {
                const errors = validationResult.violations.map(v =>
                    `${v.fieldPath || v.field || 'unknown field'}: ${v.message}`
                ).join(', ');
                const errorMessage = `Validation failed: ${errors}`;
                return res.status(400).json({ error: errorMessage });
            }

            console.log('Received consent:', toJson(consent.ConsentSchema, consentModel));

            // Create ConsentResponse model
            const consentResponse = create(consent.ConsentResponseSchema, {
                message: 'Consent received successfully'
            });

            // Return response as JSON
            res.status(200).json(toJson(consent.ConsentResponseSchema, consentResponse));
        } catch (error) {
            console.error('Error processing consent request:', error);
            res.status(400).json({ error: 'Invalid consent request' });
        }
    })
    .listen(PORT, () => console.log(`Jug Consent Service running on port ${PORT}`));