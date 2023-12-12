import PropTypes from 'prop-types'

export const PageLayout = ({ children }) => {
  return (
    <>
      <p>navbar</p>
      {children}
      <p>footer</p>
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}
