import PropTypes from 'prop-types'

export const RowContentLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-4 gap-3 items-center">
        {children}
    </div>
  );
}

RowContentLayout.propTypes = {
    children: PropTypes.node
}
