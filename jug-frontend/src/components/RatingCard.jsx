const RatingCard = ({ rating, user }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-2 bg-white hover:shadow-md transition-shadow">
      <div className="mb-1.5">
        <h3 className="font-bold text-xs text-gray-900">{rating.restaurant}</h3>
        <p className="text-[9px] text-gray-500">by {user.firstName} {user.lastName}</p>
      </div>

      <div className="flex gap-2 text-[10px] text-gray-700 mb-1">
        <span>Cheese: <strong>{rating.cheeseSqueakiness}</strong></span>
        <span>Gravy: <strong>{rating.gravyThickness}</strong></span>
        <span>Fries: <strong>{rating.friesCrispiness}</strong></span>
      </div>

      {rating.comments && (
        <p className="text-[9px] text-gray-500 mt-1 italic">"{rating.comments}"</p>
      )}
    </div>
  )
}

export default RatingCard
