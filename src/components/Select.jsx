import PropTypes from 'prop-types'

export const Select = ({
  label = '',
  id = '',
  className = '',
  value = '',
  isDisabled = false,
  handleChange = () => {},
  options = []
}) => {
  return (
    <div
      className={`relative w-full ${className} ${isDisabled && 'opacity-40'}`}
    >
      <label
        className={`absolute left-4 text-dim-gray top-3 text-xs`}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className={`bg-[#ffffff0a] border border-solid border-onyx rounded-xl px-4 text-anti-flash-white w-full pt-7 pb-3`}
        name={id}
        id={id}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
      >
        {options.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  )
}
Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleChange: PropTypes.func,
  options: PropTypes.array
}
