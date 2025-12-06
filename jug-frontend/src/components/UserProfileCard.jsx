import Input from './Input'

const UserIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const MailIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const PhoneIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const CalendarIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UserProfileCard = ({ userData, userSet, onInputChange, onSubmit, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 shadow-lg">
        <UserIcon className="w-6 h-6 text-white" />
      </div>

      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">User Profile</h2>

      {!userSet ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={onInputChange}
            required
            placeholder="John"
          />

          <Input
            label="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={onInputChange}
            required
            placeholder="Doe"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={onInputChange}
            required
            placeholder="john@example.com"
            icon={MailIcon}
          />

          <Input
            label="Age"
            type="number"
            name="age"
            value={userData.age}
            onChange={onInputChange}
            required
            min="1"
            max="120"
            placeholder="25"
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={onInputChange}
            required
            placeholder="+1 234 567 8900"
            icon={PhoneIcon}
          />

          <div className="group">
            <label htmlFor="status" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={userData.status}
              onChange={onInputChange}
              className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Save Profile
          </button>
        </form>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-100">
            <p className="text-2xl font-bold text-gray-800 text-center">
              {userData.firstName} {userData.lastName}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <MailIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{userData.email}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <PhoneIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
              <span>{userData.phoneNumber}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <CalendarIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
              <span>Age: {userData.age}</span>
            </div>

            <div className="pt-2 flex justify-center">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold transition-all ${
                userData.status === 'active' ? 'bg-green-100 text-green-800 ring-2 ring-green-200' :
                userData.status === 'premium' ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-200' :
                'bg-gray-100 text-gray-800 ring-2 ring-gray-200'
              }`}>
                {userData.status.toUpperCase()}
              </span>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="w-full mt-4 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium text-sm transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfileCard
