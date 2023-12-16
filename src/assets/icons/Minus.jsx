import PropTypes from 'prop-types'

export const Minus = ({ color = '#fff' }) => {
  return (
    <svg
      width="24px"
      height="24px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      stroke={color}
    >
      <path
        d="M6 12H18"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

Minus.propTypes = {
    color: PropTypes.string
}
