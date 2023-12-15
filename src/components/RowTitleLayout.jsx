import PropTypes from 'prop-types'

export const RowTitleLayout = ({ children, gridClassNameOverWrite = '' }) => {
  return (
    <div
      className={`grid ${
        gridClassNameOverWrite?.trim()?.length !== 0
          ? gridClassNameOverWrite
          : 'grid-cols-4 gap-3'
      } border-b border-solid border-anti-flash-white mb-3`}
    >
      {children}
    </div>
  )
}

RowTitleLayout.propTypes = {
  children: PropTypes.node,
  gridClassNameOverWrite: PropTypes.string
}
