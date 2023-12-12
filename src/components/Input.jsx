import PropTypes from 'prop-types'
import { useState } from 'react'

export const Input = ({
  label = '',
  id = '',
  type = 'text',
  isRequired = true,
  className = '',
  value = '',
  handleChange = () => {}
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div className={`relative w-full ${className}`}>
      <label
        className={`absolute left-4 text-dim-gray transition-[font-size,top] duration-300 ${
          isFocused ? 'top-3 text-xs' : 'top-5'
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`bg-[#ffffff0a] border border-solid border-onyx rounded-xl px-4 transition-[padding] duration-300 text-anti-flash-white w-full ${
          isFocused ? 'pt-7 pb-3' : 'py-5'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.target.value?.trim() === '') setIsFocused(false)
        }}
        type={type}
        id={id}
        name={id}
        required={isRequired}
        spellCheck="off"
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func
}
