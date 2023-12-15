import PropTypes from 'prop-types'
import { Close } from '../assets/icons'

export const ItemsRow = ({
  elements = [],
  setSelectedElements = () => {},
  handleRemoveSelectedElement = () => {},
  allowDeletingAll = true,
  isDisabled = false
}) => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex gap-2 overflow-x-scroll pb-2">
        {(elements.length > 1 && allowDeletingAll) && (
          <button
            type="button"
            className="rounded-xl px-3 py-2 bg-fire-engine-red hover:bg-fire-engine-red/80 w-max text-xs flex items-center gap-1"
            onClick={() => setSelectedElements([])}
            disabled={isDisabled}
          >
            <span className="w-max">Eliminar todos</span>
          </button>
        )}
        {elements?.map((element) => (
          <button
            type="button"
            className="rounded-xl px-3 py-2 bg-eerie-black-800 w-max text-xs flex items-center gap-1"
            key={element?.value}
            onClick={() => handleRemoveSelectedElement(element)}
            disabled={isDisabled}
          >
            <Close dimensions="18px" />{' '}
            <span className="w-max">{element?.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

ItemsRow.propTypes = {
  elements: PropTypes.array,
  setSelectedElements: PropTypes.func,
  handleRemoveSelectedElement: PropTypes.func,
  allowDeletingAll: PropTypes.bool,
  isDisabled: PropTypes.bool
}
