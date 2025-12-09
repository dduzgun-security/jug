import RangeSlider from '../components/RangeSlider'

const PoutineRatingForm = ({ formData, onChange }) => {
  return (
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
            onChange={onChange}
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
              onChange={onChange}
            />
            <RangeSlider
              label="Gravy Thickness"
              name="gravyThickness"
              value={formData.gravyThickness}
              onChange={onChange}
            />
            <RangeSlider
              label="Fries Crispiness"
              name="friesCrispiness"
              value={formData.friesCrispiness}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-gray-700 mb-1">Portion Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={onChange}
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
            onChange={onChange}
            rows="2"
            className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            placeholder="Share your experience..."
          />
        </div>
      </div>
    </div>
  )
}

export default PoutineRatingForm
