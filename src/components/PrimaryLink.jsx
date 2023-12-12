import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrimaryLink = ({ text = '', to = '', className = '' }) => {
  return (
    <Link
      className={`group text-fire-engine-red-500 text-sm w-max ${className}`}
      to={to}
    >
      <span className='group-hover:underline'>{text}</span>
    </Link>
  )
}

PrimaryLink.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string
}
