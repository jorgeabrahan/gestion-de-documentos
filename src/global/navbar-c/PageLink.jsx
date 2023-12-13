import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { authStore } from '../../stores'

export const PageLink = ({ to = '', tooltip = '', children, needsToBeAdmin = false }) => {
  const { user } = authStore(store => store)
  return (
    <div className={`relative group ${(needsToBeAdmin && user.role !== 'admin') && 'opacity-40 cursor-not-allowed'}`}>
      {(needsToBeAdmin && user.role !== 'admin') ? (
        <div className="bg-raisin-black-800 p-3 rounded-full flex items-center justify-center w-max">{children}</div>
      ) : (
        <Link
          className="bg-raisin-black-800 p-3 rounded-full flex items-center justify-center w-max"
          to={to}
        >
          {children}
        </Link>
      )}
      <span className="absolute z-20 mt-2 bg-raisin-black-800 px-3 py-1 rounded-lg left-[50%] -translate-x-[50%] text-xs group-hover:block hidden font-semibold">
        {tooltip}
      </span>
    </div>
  )
}

PageLink.propTypes = {
  to: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node,
  needsToBeAdmin: PropTypes.bool
}
