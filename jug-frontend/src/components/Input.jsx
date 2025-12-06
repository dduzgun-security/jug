const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder = '',
  min,
  max,
  icon: Icon
}) => {
  return (
    <div className="group">
      <label htmlFor={name} className="block text-xs font-semibold text-gray-700 mb-1.5 transition-colors group-focus-within:text-indigo-600">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          className={`w-full px-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg
            focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
            transition-all duration-200
            hover:border-gray-300
            ${Icon ? 'pl-10' : ''}
          `}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default Input
