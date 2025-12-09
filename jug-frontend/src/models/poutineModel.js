export const createPoutineModel = async (poutineData) => {
  const models = await import('@dduzgun-security/jug-model')

  const poutineRating = new models.default.poutine.Poutine()
  poutineRating.setRestaurant(poutineData.restaurant)
  poutineRating.setCheeseSqueakiness(poutineData.cheeseSqueakiness)
  poutineRating.setGravyThickness(poutineData.gravyThickness)
  poutineRating.setFriesCrispiness(poutineData.friesCrispiness)
  poutineRating.setSize(poutineData.size)
  poutineRating.setComments(poutineData.comments)

  return poutineRating
}

export const initialPoutineData = {
  restaurant: '',
  cheeseSqueakiness: 5,
  gravyThickness: 5,
  friesCrispiness: 5,
  size: 'medium',
  comments: ''
}
