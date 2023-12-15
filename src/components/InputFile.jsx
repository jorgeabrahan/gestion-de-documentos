import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const InputFile = ({
  onDrop = () => {},
  accept = '',
  isDisabled = false
}) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDragEnter = useCallback(() => {
    setIsDragActive(true)
  }, [])

  const onDragLeave = useCallback(() => {
    setIsDragActive(false)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    onDragEnter,
    onDragLeave,
    disabled: isDisabled, // Deshabilita la dropzone
    noClick: isDisabled, // Deshabilita el diálogo de selección de archivos
    noKeyboard: isDisabled // Deshabilita la interacción con el teclado
  })

  return (
    <div
      {...getRootProps()}
      className={`border-8 border-dashed border-onyx rounded-xl px-4 py-5 w-full h-64 flex items-center justify-center text-anti-flash-white transition-colors duration-300 cursor-pointer ${
        isDragActive ? 'bg-[#ffffff0a]' : 'bg-transparent'
      } ${isDisabled && 'opacity-40'}`}
    >
      <input {...getInputProps()} />
      <p className="text-center text-sm">
        Arrastre sus archivos aquí o seleccionelos desde su explorador de
        archivos
      </p>
    </div>
  )
}

InputFile.propTypes = {
  onDrop: PropTypes.func,
  accept: PropTypes.string,
  isDisabled: PropTypes.bool
}
