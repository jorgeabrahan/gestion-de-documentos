import PropTypes from 'prop-types'

export const ActionButton = ({ children, text = '', isDisabled = false, handleClick = () => {}, className = '' }) => {
  return (
    <button
      className={`bg-celtic-blue px-3 py-1 rounded-full w-max flex items-center gap-2 ${
        isDisabled && 'opacity-40 cursor-not-allowed'
      } ${className}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {children} <span className="text-sm">{text}</span>
    </button>
  )
}

ActionButton.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string
}
