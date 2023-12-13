import PropTypes from 'prop-types'

export const PrimaryLinkAsButton = ({ className = '', text = '', handleClick = () => {} }) => {
  return (
    <button
      className={`group text-fire-engine-red-500 text-sm w-max ${className}`}
      onClick={handleClick}
    >
      <span className='group-hover:underline'>{text}</span>
    </button>
  );
}

PrimaryLinkAsButton.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func
}
