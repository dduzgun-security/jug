/**
 * User Service API
 * Handles communication with the User Service (Go) on port 8002
 */

import { toJsonString } from '@bufbuild/protobuf'
import { UserSchema } from '@dduzgun-security/jug-model/rating/user/v1/user_pb.js'

const USER_SERVICE_URL = 'http://localhost:8002/user'

/**
 * Submit user data to the User Service
 * @param {Object} userModel - User protobuf model instance
 * @returns {Promise<Object>} Response from the User Service
 */
export const submitUser = async (userModel) => {
  const response = await fetch(USER_SERVICE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: toJsonString(UserSchema, userModel)
  })

  if (!response.ok) {
    throw new Error(`User service failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
