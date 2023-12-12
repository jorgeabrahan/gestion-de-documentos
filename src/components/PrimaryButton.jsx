import PropTypes from 'prop-types'

export const PrimaryButton = ({
  text = '',
  handleClick = () => {},
  className = '',
  children
}) => {
  return (
    <button
      className={`bg-fire-engine-red rounded-md font-semibold py-3 px-[22px] flex items-center justify-center gap-3 ${className}`}
      onClick={handleClick}
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
  children: PropTypes.node
}
