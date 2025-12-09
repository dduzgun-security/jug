export const createUserModel = async (userData) => {
  const models = await import('@dduzgun-security/jug-model')

  const user = new models.default.user.User()
  user.setFirstName(userData.firstName)
  user.setLastName(userData.lastName)
  user.setEmail(userData.email)
  user.setAge(userData.age)
  user.setPhoneNumber(userData.phoneNumber)
  user.setStatus(userData.status)

  return user
}

export const initialUserData = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  phoneNumber: '',
  status: 'active'
}
