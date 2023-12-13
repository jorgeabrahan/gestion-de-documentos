import PropTypes from 'prop-types'

export const UserEntriesLayout = ({ children }) => {
  return (
    <section className="mt-2 bg-raisin-black-800 px-5 py-3 w-max rounded-2xl absolute grid gap-3">
      {children}
    </section>
  )
}

UserEntriesLayout.propTypes = {
  children: PropTypes.node
}
