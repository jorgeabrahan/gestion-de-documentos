import PropTypes from 'prop-types'

export const ManageDocumentTypes = ({ color = '#fff', dimensions = '24px' }) => {
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
        d="M6 6L14 6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6 10H18"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13 14L18 14"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13 18L18 18"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M2 21.4V2.6C2 2.26863 2.26863 2 2.6 2H18.2515C18.4106 2 18.5632 2.06321 18.6757 2.17574L21.8243 5.32426C21.9368 5.43679 22 5.5894 22 5.74853V21.4C22 21.7314 21.7314 22 21.4 22H2.6C2.26863 22 2 21.7314 2 21.4Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6 18V14H9V18H6Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18 2V5.4C18 5.73137 18.2686 6 18.6 6H22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

ManageDocumentTypes.propTypes = {
    color: PropTypes.string,
    dimensions: PropTypes.string
}
