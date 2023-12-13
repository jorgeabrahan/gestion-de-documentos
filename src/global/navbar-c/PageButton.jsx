import PropTypes from 'prop-types'

export const PageButton = ({
  handleClick = () => {},
  tooltip = '',
  children,
  isPrimary = false
}) => {
  return (
    <div className="relative group">
      <button
        className={`${
          isPrimary ? 'bg-fire-engine-red-500' : 'bg-raisin-black-800'
        } p-3 rounded-full flex items-center justify-center w-max`}
        onClick={handleClick}
      >
        {children}
      </button>
      <span
        className={`absolute mt-2 ${
          isPrimary ? 'bg-fire-engine-red-500' : 'bg-raisin-black-800'
        } px-3 py-1 rounded-lg left-[50%] -translate-x-[50%] text-xs group-hover:block hidden font-semibold z-20`}
      >
        {tooltip}
      </span>
    </div>
  )
}

PageButton.propTypes = {
  handleClick: PropTypes.func,
  tooltip: PropTypes.string,
  children: PropTypes.node,
  isPrimary: PropTypes.bool
}
