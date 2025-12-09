const UserForm = ({ formData, onChange }) => {
  return (
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            required
            min="1"
            max="120"
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
            onChange={onChange}
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
            onChange={onChange}
            className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div className="col-span-3">
          <label className="block text-[10px] font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            required
            className="w-full px-2 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>
    </div>
  )
}

export default UserForm
