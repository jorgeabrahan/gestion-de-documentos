import PropTypes from 'prop-types'

export const OpenExternal = ({ color = '#fff', dimensions = '24px' }) => {
  return (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      stroke={color}
    >
      <path
        d="M21 3L15 3M21 3L12 12M21 3V9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H11"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  )
}

OpenExternal.propTypes = {
    color: PropTypes.string,
    dimensions: PropTypes.string
}
