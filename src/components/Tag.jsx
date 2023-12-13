import PropTypes from 'prop-types'

export const Tag = ({ text = '' }) => {
  return (
    <span className="bg-fire-engine-red-500 rounded-full font-semibold px-3 py-1 text-xs">{text}</span>
  );
}

Tag.propTypes = {
    text: PropTypes.string
}
