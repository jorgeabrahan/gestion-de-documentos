import PropTypes from 'prop-types'

export const PrimaryButtonSmall = ({
  text = '',
  handleClick = () => {},
  className = '',
  children
}) => {
  return (
    <button
      className={`bg-fire-engine-red rounded-md text-xs font-semibold py-3 px-4 flex items-center justify-center gap-3 ${className}`}
      onClick={handleClick}
    >
      {children}
      {text}
    </button>
  )
}

PrimaryButtonSmall.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}
