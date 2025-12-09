const RatingCard = ({ rating, user }) => {
  const overallScore = ((rating.cheeseSqueakiness + rating.gravyThickness + rating.friesCrispiness) / 3).toFixed(1)

  return (
    <div className="border border-gray-200 rounded-lg p-2 hover:border-indigo-300 transition-all bg-white">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xs text-gray-900 truncate">
            {rating.restaurant}
          </h3>
          <p className="text-[10px] text-gray-500">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="flex items-center gap-0.5 bg-indigo-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">
          ⭐ {overallScore}/10
        </div>
      </div>

      <div className="flex gap-2 text-[10px]">
        <div className="flex-1">
          <span className="text-gray-500">Cheese:</span>
          <span className="font-bold text-amber-600 ml-0.5">{rating.cheeseSqueakiness}/10</span>
        </div>
        <div className="flex-1">
          <span className="text-gray-500">Gravy:</span>
          <span className="font-bold text-orange-600 ml-0.5">{rating.gravyThickness}/10</span>
        </div>
        <div className="flex-1">
          <span className="text-gray-500">Fries:</span>
          <span className="font-bold text-yellow-600 ml-0.5">{rating.friesCrispiness}/10</span>
        </div>
      </div>

      {rating.comments && (
        <p className="text-[10px] text-gray-600 mt-1.5 pt-1.5 border-t border-gray-100 italic">
          "{rating.comments}"
        </p>
      )}
    </div>
  )
}

export default RatingCard
