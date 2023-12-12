import PropTypes from 'prop-types'

export const CenteredBoxLayout = ({ children }) => {
  return (
    <section className="w-full max-w-[500px] mx-auto bg-raisin-black-800 px-2 py-3 sm:px-5 sm:py-8 rounded-2xl">
      {children}
    </section>
  )
}

CenteredBoxLayout.propTypes = {
  children: PropTypes.node
}
