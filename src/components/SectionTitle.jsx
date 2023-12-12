import PropTypes from 'prop-types'

export const SectionTitle = ({ text = '', className = '', isCentered = false }) => {
  return <h2 className={`text-[28px] font-semibold ${isCentered && 'text-center'} ${className}`}>{text}</h2>
}

SectionTitle.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  isCentered: PropTypes.bool
}
