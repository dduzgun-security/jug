import { useState, useEffect } from 'react'
import './App.css'
import RatingCard from './components/RatingCard'
import UserForm from './forms/UserForm'
import PoutineRatingForm from './forms/PoutineRatingForm'
import { initialUserData } from './models/userModel'
import { initialPoutineData } from './models/poutineModel'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [formData, setFormData] = useState({
    ...initialUserData,
    ...initialPoutineData
  })

  const [savedRatings, setSavedRatings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all ratings on component mount
  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/ratings`)
      if (!response.ok) throw new Error('Failed to fetch ratings')
      const data = await response.json()

      // Transform the data to match the expected format
      const transformedRatings = data.ratings?.map(rating => ({
        id: rating.id,
        user: {
          firstName: rating.user?.first_name || '',
          lastName: rating.user?.last_name || '',
          email: rating.user?.email || '',
          age: rating.user?.age || 0,
          phoneNumber: rating.user?.phone_number || '',
          status: rating.user?.status || 'active'
        },
        rating: {
          restaurant: rating.restaurant,
          cheeseSqueakiness: rating.cheese_squeakiness,
          gravyThickness: rating.gravy_thickness,
          friesCrispiness: rating.fries_crispiness,
          size: rating.size,
          comments: rating.comments
        }
      })) || []

      setSavedRatings(transformedRatings)
    } catch (err) {
      console.error('Error fetching ratings:', err)
      // setError('Failed to load ratings')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'age' || name.includes('ness') || name.includes('iness')) ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Step 1: Create user
      const userResponse = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          age: formData.age,
          phone_number: formData.phoneNumber,
          status: formData.status
        })
      })

      if (!userResponse.ok) throw new Error('Failed to create user')
      const userData = await userResponse.json()
      const userId = userData.user?.id

      console.log('Created user:', userData)

      // Step 2: Create rating with the user_id
      const ratingResponse = await fetch(`${API_URL}/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          restaurant: formData.restaurant,
          cheese_squeakiness: formData.cheeseSqueakiness,
          gravy_thickness: formData.gravyThickness,
          fries_crispiness: formData.friesCrispiness,
          size: formData.size,
          comments: formData.comments
        })
      })

      if (!ratingResponse.ok) throw new Error('Failed to create rating')
      const ratingData = await ratingResponse.json()

      console.log('Created rating:', ratingData)

      // Refresh the ratings list to show the new rating
      await fetchRatings()

      // Reset rating fields only
      setFormData(prev => ({
        ...prev,
        ...initialPoutineData
      }))

    } catch (err) {
      console.error('Error submitting rating:', err)
      setError(err.message || 'Failed to submit rating')
    } finally {
      setLoading(false)
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
                <UserForm formData={formData} onChange={handleInputChange} />
                <PoutineRatingForm formData={formData} onChange={handleInputChange} />

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 rounded-lg font-bold text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Submitting...' : 'Submit Rating'}
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
