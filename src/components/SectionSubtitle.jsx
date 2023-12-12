import PropTypes from 'prop-types'

export const SectionSubtitle = ({ text = '', isCentered = false, className = '' }) => {
  return (
      <h3 className={`text-[21px] ${isCentered && 'text-center'} ${className}`}>{text}</h3>
  );
}

SectionSubtitle.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    isCentered: PropTypes.bool
}
