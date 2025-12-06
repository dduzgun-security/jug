const RangeSlider = ({ label, name, value, onChange, min = 0, max = 10 }) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-semibold text-gray-700">{label}</label>
        <div className="flex items-center gap-1">
          <div className="relative">
            <span className="text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {value}
            </span>
            <span className="text-[10px] text-gray-500 ml-0.5">/{max}</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-enhanced"
          style={{
            background: `linear-gradient(to right,
              #f59e0b 0%,
              #f59e0b ${percentage}%,
              #e5e7eb ${percentage}%,
              #e5e7eb 100%)`
          }}
        />
      </div>
    </div>
  )
}

export default RangeSlider
