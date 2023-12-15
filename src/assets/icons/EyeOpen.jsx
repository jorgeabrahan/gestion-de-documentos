import PropTypes from 'prop-types'

export const EyeOpen = ({ color = '#000', dimensions = '24px' }) => {
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
        d="M3 13C6.6 5 17.4 5 21 13"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

EyeOpen.propTypes = {
    color: PropTypes.string,
    dimensions: PropTypes.string
}
