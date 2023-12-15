import PropTypes from 'prop-types'

export const Tag = ({ text = '', isBlue = false }) => {
  return (
    <span className={`${isBlue ? 'bg-celtic-blue' : 'bg-fire-engine-red-500'} rounded-full font-semibold px-3 py-1 text-xs w-max h-max`}>{text}</span>
  );
}

Tag.propTypes = {
    text: PropTypes.string,
    isBlue: PropTypes.bool
}
