import PropTypes from 'prop-types'

export const SecondaryDescription = ({ text = '', className = '' }) => {
  return (
    <p className={`text-dim-gray text-sm ${className}`}>{text}</p>
  );
}

SecondaryDescription.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
}
