import PropTypes from 'prop-types'
import { CenteredBoxLayout } from '../layouts'
import { SectionTitle } from '../components'
import { Close } from '../assets/icons'
import { dataStore } from '../stores'

export const ModalLayout = ({ children, title = '', isCloseButtonDisabled = false }) => {
  const { setModalToShow } = dataStore((store) => store)
  return (
    <div className="fixed inset-0 w-full h-screen bg-black/40 z-30 grid place-items-center">
      <CenteredBoxLayout>
        <div className="flex justify-between mb-4">
          <SectionTitle text={title} />
          <button
            className="bg-fire-engine-red-500 p-3 rounded-full flex items-center justify-center w-max"
            onClick={() => setModalToShow(null)}
            disabled={isCloseButtonDisabled}
          >
            <Close />
          </button>
        </div>
        {children}
      </CenteredBoxLayout>
    </div>
  )
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isCloseButtonDisabled: PropTypes.bool
}
