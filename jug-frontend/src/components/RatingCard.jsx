const StarIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const RatingCard = ({ rating, user }) => {
  const overallScore = ((rating.cheesesqueakiness + rating.gravythickness + rating.friescrispiness) / 3).toFixed(1)

  return (
    <div className="border-2 border-gray-100 rounded-lg p-3 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 group animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-sm text-gray-900 mb-0.5 group-hover:text-indigo-600 transition-colors">
            {rating.restaurant}
          </h3>
          <p className="text-[10px] text-gray-500">
            by {user.firstname} {user.lastname}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded-full shadow-md group-hover:shadow-lg transition-all">
          <StarIcon className="w-3 h-3" />
          <span className="font-bold text-xs">{overallScore}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <div className="bg-amber-50 rounded-md p-1.5 border border-amber-200 hover:bg-amber-100 transition-colors">
          <p className="text-[10px] text-gray-600 font-medium mb-0.5">Cheese</p>
          <p className="text-xs font-bold text-amber-600">{rating.cheesesqueakiness}/10</p>
        </div>
        <div className="bg-orange-50 rounded-md p-1.5 border border-orange-200 hover:bg-orange-100 transition-colors">
          <p className="text-[10px] text-gray-600 font-medium mb-0.5">Gravy</p>
          <p className="text-xs font-bold text-orange-600">{rating.gravythickness}/10</p>
        </div>
        <div className="bg-yellow-50 rounded-md p-1.5 border border-yellow-200 hover:bg-yellow-100 transition-colors">
          <p className="text-[10px] text-gray-600 font-medium mb-0.5">Fries</p>
          <p className="text-xs font-bold text-yellow-600">{rating.friescrispiness}/10</p>
        </div>
        <div className="bg-blue-50 rounded-md p-1.5 border border-blue-200 hover:bg-blue-100 transition-colors">
          <p className="text-[10px] text-gray-600 font-medium mb-0.5">Size</p>
          <p className="text-xs font-bold text-blue-600 capitalize">{rating.size}</p>
        </div>
      </div>

      {rating.comments && (
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200 hover:bg-gray-100 transition-colors">
          <p className="text-[10px] text-gray-500 mb-0.5 font-semibold">Comments:</p>
          <p className="text-xs text-gray-700 italic leading-relaxed">"{rating.comments}"</p>
        </div>
      )}
    </div>
  )
}

export default RatingCard
