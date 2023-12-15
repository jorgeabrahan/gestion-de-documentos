import PropTypes from 'prop-types'
import { useState } from 'react'

export const Textarea = ({
  value = '',
  handleChange = () => {},
  className = '',
  id = '',
  label = '',
  isRequired = false,
  isDisabled = false
}) => {
  const [isFocused, setIsFocused] = useState(value.trim() !== '')
  return (
    <div className={`relative w-full ${className} ${isDisabled && 'opacity-40'}`}>
      <label
        className={`absolute left-4 text-dim-gray transition-[font-size,top] duration-300 ${
          isFocused ? 'top-3 text-xs' : 'top-5'
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className={`bg-[#ffffff0a] border border-solid border-onyx rounded-xl px-4 transition-[padding] duration-300 text-anti-flash-white w-full resize-none ${
          isFocused ? 'pt-7 pb-3' : 'py-5'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.target.value?.trim() === '') setIsFocused(false)
        }}
        name={id}
        id={id}
        cols="30"
        rows="10"
        spellCheck="off"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        required={isRequired}
        disabled={isDisabled}
      ></textarea>
    </div>
  )
}

Textarea.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool
}
