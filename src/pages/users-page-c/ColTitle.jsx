import PropTypes from 'prop-types'

export const ColTitle = ({ text = '' }) => {
  return (
    <h2 className="font-semibold text-lg pb-2">{text}</h2>
  );
}

ColTitle.propTypes = {
    text: PropTypes.string
}
