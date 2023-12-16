import PropTypes from 'prop-types'

export const Tag = ({ text = '', className = '' }) => {
  return (
    <span
      className={`${
        className?.trim()?.length === 0 ? 'bg-fire-engine-red-500' : className
      } rounded-full font-semibold px-3 py-1 text-xs w-max h-max`}
    >
      {text}
    </span>
  )
}

Tag.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
}
