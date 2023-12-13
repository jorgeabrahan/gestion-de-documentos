import PropTypes from 'prop-types'

export const UserEntry = ({ title = '', text = '' }) => {
  return (
    <div>
      <p className="text-dim-gray text-xs">{title}</p>
      <p className="text-sm">{text}</p>
    </div>
  )
}

UserEntry.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}
