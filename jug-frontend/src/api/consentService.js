/**
 * Consent Service API
 * Handles communication with the Consent Service (JS) on port 8000
 */

const CONSENT_SERVICE_URL = 'http://localhost:8000/consent'

/**
 * Submit user consent to the Consent Service
 * @param {Object} consentModel - Consent protobuf model instance
 * @returns {Promise<Object>} Response from the Consent Service
 */
export const submitConsent = async (consentModel) => {
  const response = await fetch(CONSENT_SERVICE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(consentModel.toObject())
  })

  if (!response.ok) {
    throw new Error(`Consent service failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
