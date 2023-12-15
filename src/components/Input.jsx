import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { EyeClosed, EyeOpen } from '../assets/icons'

export const Input = ({
  label = '',
  id = '',
  type = 'text',
  isRequired = true,
  className = '',
  value = '',
  isDisabled = false,
  handleChange = () => {},
  handleKeyDown = () => {}
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(value.trim() !== '')
  useEffect(() => {
    if (value.trim() !== '' && !isFocused) setIsFocused(true)
  }, [value])
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
      <input
        className={`bg-[#ffffff0a] border border-solid border-onyx rounded-xl px-4 transition-[padding] duration-300 text-anti-flash-white w-full ${
          isFocused ? 'pt-7 pb-3' : 'py-5'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.target.value?.trim() === '') setIsFocused(false)
        }}
        type={type === 'password' ? (isPasswordVisible ? 'text' : type) : type}
        id={id}
        name={id}
        required={isRequired}
        spellCheck="off"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
      {type === 'password' && (
        <button onClick={() => setIsPasswordVisible(prev => !prev)} className='absolute right-4 top-[50%] -translate-y-[50%]' type='button'>
          {isPasswordVisible ? <EyeClosed color='#6E6E73' /> : <EyeOpen color='#6E6E73' />}
        </button>
      )}
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
  isDisabled: PropTypes.bool,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func
}
