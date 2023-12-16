import PropTypes from 'prop-types'

export const AddComment = ({ color = '#fff', dimensions = '24px' }) => {
  return (
    <svg
      width={dimensions}
      height={dimensions}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      stroke={color}
    >
      <path
        d="M9 12H12M15 12H12M12 12V9M12 12V15"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

AddComment.propTypes = {
  color: PropTypes.string,
  dimensions: PropTypes.string
}
