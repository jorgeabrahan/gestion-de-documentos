import PropTypes from 'prop-types'

export const RowTitleLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-4 gap-3 border-b border-solid border-anti-flash-white mb-3">
      {children}
    </div>
  )
}

RowTitleLayout.propTypes = {
  children: PropTypes.node
}
