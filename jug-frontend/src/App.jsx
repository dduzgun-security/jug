import { useState } from 'react'
import './App.css'
import RangeSlider from './components/RangeSlider'
import RatingCard from './components/RatingCard'
import { create } from '@bufbuild/protobuf'
import { createValidator } from '@bufbuild/protovalidate'
import { UserSchema } from '@dduzgun-security/jug-model/rating/user/v1/user_pb.js'
import { PoutineSchema } from '@dduzgun-security/jug-model/rating/poutine/v1/poutine_pb.js'
import { ConsentSchema } from '@dduzgun-security/jug-model/rating/consent/v1/consent_pb.js'
import { submitUser, submitPoutineRating, submitConsent } from './api'

function App() {
  const [formData, setFormData] = useState({
    // User data
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    phoneNumber: '',
    status: 'Active',
    // Rating data
    restaurant: '',
    cheeseSqueakiness: 5,
    gravyThickness: 5,
    friesCrispiness: 5,
    size: 'medium',
    comments: '',
    // Consent data
    consent: false
  })

  const [savedRatings, setSavedRatings] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'age' || name.includes('ness') || name.includes('iness')) ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Create User instance using protobuf v2 API
      const user = create(UserSchema, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: formData.age,
        phoneNumber: formData.phoneNumber,
        status: formData.status
      })

      // Create Poutine instance using protobuf v2 API
      const poutineRating = create(PoutineSchema, {
        restaurant: formData.restaurant,
        cheeseSqueakiness: formData.cheeseSqueakiness,
        gravyThickness: formData.gravyThickness,
        friesCrispiness: formData.friesCrispiness,
        size: formData.size,
        comments: formData.comments
      })

      // Create Consent instance using protobuf v2 API
      const consentModel = create(ConsentSchema, {
        email: formData.email,
        consent: formData.consent
      })

      console.log('User Model:', user)
      console.log('Poutine Rating Model:', poutineRating)
      console.log('Consent Model:', consentModel)

      // Validate models using protovalidate
      const validator = createValidator()

      const userValidation = validator.validate(UserSchema, user)
      if (userValidation.kind !== 'valid') {
        const errors = userValidation.violations.map(v => `${v.fieldPath}: ${v.message}`).join(', ')
        throw new Error(`User validation failed: ${errors}`)
      }

      const poutineValidation = validator.validate(PoutineSchema, poutineRating)
      if (poutineValidation.kind !== 'valid') {
        const errors = poutineValidation.violations.map(v => `${v.fieldPath}: ${v.message}`).join(', ')
        throw new Error(`Poutine validation failed: ${errors}`)
      }

      const consentValidation = validator.validate(ConsentSchema, consentModel)
      if (consentValidation.kind !== 'valid') {
        const errors = consentValidation.violations.map(v => `${v.fieldPath}: ${v.message}`).join(', ')
        throw new Error(`Consent validation failed: ${errors}`)
      }

      console.log('All models validated successfully!')

      // Make API calls in parallel using dedicated service functions
      const [userResult, poutineResult, consentResult] = await Promise.all([
        submitUser(user),
        submitPoutineRating(poutineRating),
        submitConsent(consentModel)
      ])

      console.log('User Response:', userResult)
      console.log('Poutine Response:', poutineResult)
      console.log('Consent Response:', consentResult)

      // Add to saved ratings with average score from API response
      setSavedRatings(prev => [...prev, {
        id: Date.now(),
        user: user,
        rating: {
          ...poutineRating,
          averageScore: poutineResult.averageScore || poutineResult.average_score
        }
      }])

      // Reset rating fields only
      setFormData(prev => ({
        ...prev,
        restaurant: '',
        cheeseSqueakiness: 5,
        gravyThickness: 5,
        friesCrispiness: 5,
        size: 'medium',
        comments: '',
        consent: false
      }))
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error.message || 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-7xl w-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-0.5">
            Poutine Rating Platform
          </h1>
          <p className="text-[10px] text-gray-500">Share your authentic poutine experiences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 flex-1 overflow-hidden min-h-0">
          {/* Left Column - Combined User & Rating Form */}
          <div className="lg:col-span-2 overflow-hidden">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-3 h-full overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-2 h-full flex flex-col">
                {/* User Information Section */}
                <div className="border-b border-gray-200 pb-2">
                  <h2 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    User Information
                  </h2>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="150"
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="25"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                </div>

                {/* Poutine Rating Section */}
                <div className="flex-1 min-h-0">
                  <h2 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-md flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    Poutine Rating
                  </h2>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Restaurant Name</label>
                      <input
                        type="text"
                        name="restaurant"
                        value={formData.restaurant}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="e.g., La Banquise"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-2 border-2 border-amber-100">
                      <h3 className="text-[10px] font-bold text-gray-700 mb-1.5">Quality Ratings</h3>
                      <div className="space-y-1.5">
                        <RangeSlider
                          label="Cheese Squeakiness"
                          name="cheeseSqueakiness"
                          value={formData.cheeseSqueakiness}
                          onChange={handleInputChange}
                        />
                        <RangeSlider
                          label="Gravy Thickness"
                          name="gravyThickness"
                          value={formData.gravyThickness}
                          onChange={handleInputChange}
                        />
                        <RangeSlider
                          label="Fries Crispiness"
                          name="friesCrispiness"
                          value={formData.friesCrispiness}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Portion Size</label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xlarge">X-Large</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-700 mb-1">Comments</label>
                      <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                        placeholder="Share your experience..."
                      />
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 border-2 border-blue-100">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleInputChange}
                          required
                          className="mt-0.5 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <span className="text-[10px] text-gray-700">
                          I consent to share my rating data for analysis and improvement of the platform
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-2 text-[10px] text-red-700">
                    <strong>Error:</strong> {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 rounded-lg font-bold text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Saved Ratings */}
          <div className="lg:col-span-3 overflow-hidden flex flex-col">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-3 h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-md flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xs font-bold text-gray-800">Saved Ratings</h2>
                </div>
                {savedRatings.length > 0 && (
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                    {savedRatings.length}
                  </span>
                )}
              </div>

              {savedRatings.length === 0 ? (
                <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 shadow-inner">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-semibold text-xs mb-0.5">No ratings yet</p>
                  <p className="text-[10px] text-gray-400">Start rating your favorite poutines!</p>
                </div>
              ) : (
                <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1 flex-1">
                  {savedRatings.map((item) => (
                    <RatingCard key={item.id} rating={item.rating} user={item.user} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
