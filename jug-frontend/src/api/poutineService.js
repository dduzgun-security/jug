/**
 * Poutine Service API
 * Handles communication with the Poutine Service (Java) on port 8001
 */

const POUTINE_SERVICE_URL = 'http://localhost:8001/poutine'

/**
 * Submit poutine rating to the Poutine Service
 * @param {Object} poutineModel - Poutine protobuf model instance
 * @returns {Promise<Object>} Response from the Poutine Service including averageScore
 */
export const submitPoutineRating = async (poutineModel) => {
  const response = await fetch(POUTINE_SERVICE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(poutineModel.toObject())
  })

  if (!response.ok) {
    throw new Error(`Poutine service failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
