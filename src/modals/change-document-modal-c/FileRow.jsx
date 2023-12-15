import PropTypes from 'prop-types'
import { Delete, EyeClosed, EyeOpen } from '../../assets/icons'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const FileRow = ({
  file = { path: '', name: '' },
  nameSplitted = [],
  size = '',
  handleDelete = () => {},
  isDisabled = false
}) => {
  const [showPreview, setShowPreview] = useState(false)
  const isPreviewAvailable = (file?.type?.includes('image') || file?.type?.includes('pdf'))
  return (
    <div
      className="grid grid-cols-4 items-center gap-2 relative"
      key={`${file?.path}-${file?.name}`}
    >
      <p
        className="text-sm truncate"
        title={nameSplitted.slice(0, -1).join('.')}
      >
        {nameSplitted.slice(0, -1).join('.')}
      </p>
      <p className="text-sm">{nameSplitted[nameSplitted.length - 1]}</p>
      <p className="text-sm">{size}</p>
      <div className="flex gap-2 items-center">
        <button
          className={`bg-fire-engine-red p-2 rounded-full ${isDisabled && 'opacity-40'}`}
          type="button"
          onClick={handleDelete}
          disabled={isDisabled}
        >
          <Delete dimensions="14px" />
        </button>
        <button
          className={`bg-celtic-blue p-2 rounded-full ${!isPreviewAvailable && 'opacity-40'} ${isDisabled && 'opacity-40'}`}
          type="button"
          onClick={() => { 
            if (!isPreviewAvailable) {
              toast.error('La previsualizacion no esta disponibles para este archivo')
              return
            }
            setShowPreview(prev => !prev)
           }}
           disabled={isDisabled}
        >
          {showPreview ? <EyeClosed color="#fff" dimensions="14px" /> : <EyeOpen color="#fff" dimensions="14px" />}
        </button>
      </div>
      {showPreview && <div className='col-span-4'>
        {file?.type?.includes('image') && (
          <img className='border border-onyx border-solid rounded-xl max-h-[300px] object-cover' src={URL.createObjectURL(file)} alt={file?.name} />
        )}
        {file?.type?.includes('pdf') && (
          <iframe src={URL.createObjectURL(file)} width="100%" height="500px">
            Este navegador no soporta la visualización de PDFs.
          </iframe>
        )}
      </div>}
    </div>
  )
}

FileRow.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string
  }),
  nameSplitted: PropTypes.array,
  size: PropTypes.string,
  handleDelete: PropTypes.func,
  isDisabled: PropTypes.bool
}
