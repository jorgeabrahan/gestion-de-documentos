import PropTypes from 'prop-types'

export const PrimaryButton = ({
  text = '',
  handleClick = () => {},
  className = '',
  isDisabled = false,
  children
}) => {
  return (
    <button
      className={`bg-fire-engine-red rounded-md font-semibold py-3 px-[22px] flex items-center justify-center gap-3 ${isDisabled && 'opacity-40'} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
      {text}
    </button>
  )
}

PrimaryButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  children: PropTypes.node
}
