import PropTypes from 'prop-types'

export const SecondaryDescription = ({ text = '' }) => {
  return (
    <p className='text-dim-gray text-sm'>{text}</p>
  );
}

SecondaryDescription.propTypes = {
    text: PropTypes.string
}
